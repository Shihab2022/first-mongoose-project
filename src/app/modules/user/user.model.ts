import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
const userSchema = new Schema<TUser, UserModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
        },
        passwordChangeAt: {
            type: Date
        },
        role: {
            type: String,
            enum: ['student', 'faculty', 'admin'],
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})
userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next()
})


/// create static for checking user

userSchema.statics.isUserExitsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select("+password")

}

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (passwordChangedTimeStamp: Date, jwtIssuedTimeStamp: number) {

    const passwordChangeTime = new Date(passwordChangedTimeStamp).getTime() / 1000

    return passwordChangeTime > jwtIssuedTimeStamp
}

export const User = model<TUser, UserModel>('User', userSchema)
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const adminSchema = new Schema<TAdmin>({
    id: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: {
            values: ['admin'],
        }
    },
    status: {
        type: String,
        enum: {
            values: ['in-progress', 'blocked'],
        },
        default: "in-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

adminSchema.pre("save", async function (next) {
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()

})
adminSchema.pre("save", async function (next) {
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()

})
export const Admin = model<TAdmin>('admin', adminSchema)
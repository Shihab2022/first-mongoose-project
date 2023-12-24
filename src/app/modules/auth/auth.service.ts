import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utiles";
import { sendEmail } from "../../utils/sendEmail";

const LoginUser = async (payload: TLoginUser) => {

    ///checking if the user is exit

    // const isUserExit = await User.findOne({ id: payload.id })
    // console.log(isUserExit)
    const user = await User.isUserExitsByCustomId(payload.id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !!")
    }
    /// checking if the user is already deleted

    const isUserDeleted = user.isDeleted
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!!")
    }
    /// checking if the user is blocked

    const userStatus = user.status
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!!")
    }

    /// checking if the password is correct 

    // const isPasswordMatched = await bcrypt.compare(payload.password, isUserExit.password)
    // console.log('isPasswordMatched', isPasswordMatched)

    if (! await User.isPasswordMatched(payload?.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, "Your password is not match ")
    }

    /// create token and send to the client
    const jwtPayload = {
        userId: user.id,
        role: user.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)

    // create refresh  token 
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expire_in as string)


    return { accessToken, refreshToken, needsPasswordChange: user.needsPasswordChange }
}

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {
    const user = await User.isUserExitsByCustomId(userData.userId)
    console.log('user', user)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !!")
    }
    /// checking if the user is already deleted

    const isUserDeleted = user.isDeleted
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!!")
    }
    /// checking if the user is blocked

    const userStatus = user.status
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!!")
    }

    /// checking if the password is correct 

    // const isPasswordMatched = await bcrypt.compare(payload.password, isUserExit.password)
    // console.log('isPasswordMatched', isPasswordMatched)

    if (! await User.isPasswordMatched(payload?.oldPassword, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, "Your password is not match ")
    }


    /// hash new password

    const newHashPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))

    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date()
    })
    return null
}

const refreshToken = async (token: string) => {

    /// verify the token
    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload///here  there have an problem 
    const { userId, iat } = decoded

    const user = await User.isUserExitsByCustomId(userId)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !!")
    }
    /// checking if the user is already deleted

    const isUserDeleted = user.isDeleted
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!!")
    }
    /// checking if the user is blocked

    const userStatus = user.status
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!!")
    }
    if (user.passwordChangeAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
    }


    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)

    return {
        accessToken
    }
}

const forgetPassword = async (userId: string) => {

    const user = await User.isUserExitsByCustomId(userId)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !!")
    }
    /// checking if the user is already deleted

    const isUserDeleted = user.isDeleted
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!!")
    }
    /// checking if the user is blocked

    const userStatus = user.status
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!!")
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m')

    const resetUiLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`

    sendEmail(user.email, resetUiLink)
    console.log('resetUiLink', resetUiLink)
}

const resetPassword = async (payload: { id: string, newPassword: string }, token) => {
    const user = await User.isUserExitsByCustomId(payload.id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !!")
    }
    /// checking if the user is already deleted

    const isUserDeleted = user.isDeleted
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!!")
    }
    /// checking if the user is blocked

    const userStatus = user.status
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!!")
    }
}
export const AuthService = {
    LoginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}
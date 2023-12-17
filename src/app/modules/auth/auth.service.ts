import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt"

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





    return {}
}

export const AuthService = {
    LoginUser
}
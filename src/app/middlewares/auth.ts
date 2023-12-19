
import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from "jsonwebtoken"
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'


const auth = (...requiredRoles: TUserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            // check user send token or not
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
            }

            /// verify the token
            const decoded = jwt.verify(token, config.jwt_access_secret as string,) as JwtPayload

            const { role, userId, iat } = decoded

            const user = await User.isUserExitsByCustomId(userId)
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
            if (user.passwordChangeAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
            }
            req.user = decoded
            next()


        } catch (error) {
            next(error)
        }
    }
}

export default auth
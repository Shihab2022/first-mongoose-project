
import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from "jsonwebtoken"
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'


const auth = (...requiredRoles: TUserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            // check user send token or not
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
            }

            /// verify the token
            jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
                if (err) {
                    throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
                }

                const role = (decoded as JwtPayload).role
                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
                }
                req.user = decoded as JwtPayload
                next()
            })

        } catch (error) {
            next(error)
        }
    }
}

export default auth
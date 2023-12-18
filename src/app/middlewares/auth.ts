
import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized !!")
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default auth
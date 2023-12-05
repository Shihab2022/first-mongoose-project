/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';


const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = error.statusCode || 500;
    let message = error.message || 'Something went wrong !'

    let errorSources: TErrorSource[] = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    const handleZodError = (err: ZodError) => {

        const errorSource: TErrorSource[] = err.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message
            }
        })
        const statusCode = 400
        return {
            statusCode,
            message: "validation Error",
            errorSource
        }
    }

    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource

    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? error?.stack : null
    })
}
export default globalErrorHandler;

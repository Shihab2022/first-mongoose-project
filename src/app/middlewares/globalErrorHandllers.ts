/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';


const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = error.statusCode || 500;
    let message = error.message || 'Something went wrong !'

    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]



    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources

    }

    else if (error.name === "ValidationError") {

        const simplifiedError = handleValidationError(error)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    }
    else if (error.name === "CastError") {

        const simplifiedError = handleCastError(error)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    }
    else if (error.code === 11000) {

        const simplifiedError = handleDuplicateError(error)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? error?.stack : null
    })
}
export default globalErrorHandler;

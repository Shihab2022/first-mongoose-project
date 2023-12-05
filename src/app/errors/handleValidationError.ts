import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const errorSources: TErrorSource[] = Object.values(error.errors).map((value: mongoose.Error.ValidationError | mongoose.Error.CastError | mongoose.Error) => {
        return {
            path: value?.path,
            message: value.message,
        }
    })
    const statusCode = 400
    return {
        statusCode,
        message: 'Validation Error',
        errorSources
    }

}

export default handleValidationError
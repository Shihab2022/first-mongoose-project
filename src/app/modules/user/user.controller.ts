
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sentResponce"
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createStudent = catchAsync(async (req, res): any => {
    const { password, student: studentData } = req.body
    const result = await UserServices.createStudentIntoDB(password, studentData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is created successfully !!!",
        data: result
    })
})
const getMe = catchAsync(async (req, res): any => {
    const token = req.headers.authorization
    if (!token) {
        throw new AppError(httpStatus.NOT_FOUND, "Token is not found !")
    }
    const result = await UserServices.getMe(token)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is created successfully !!!",
        data: result
    })
})

export const UserControllers = {
    createStudent,
    getMe
}
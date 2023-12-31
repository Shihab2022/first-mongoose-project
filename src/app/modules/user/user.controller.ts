
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sentResponce"
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";

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

export const UserControllers = {
    createStudent
}
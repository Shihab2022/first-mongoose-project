import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
// import studentValidationSchema from "./student.joi.validation";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}

const getAllStudent = catchAsync(async (req, res, next) => {

    const result = await studentServices.getAllStudentFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all student successfully !!!",
        data: result
    })
})
// const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await studentServices.getAllStudentFromDB()

//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: "Get all student successfully !!!",
//             data: result
//         })
//     }
//     catch (error) {
//         next(error)
//     }
// }
const getSingleStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentFromDB(studentId)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "'Get single  student successfully !!!",
        data: result
    })
})
const deleteStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params
    const result = await studentServices.deleteStudentFromDB(studentId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "student deleted  successfully !!!",
        data: result
    })
})

export const studentController = {
    getAllStudent,
    getSingleStudent,
    deleteStudent
}
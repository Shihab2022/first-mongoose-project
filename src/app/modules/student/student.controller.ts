import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchemaWithZod from "./student.validation";
import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
// import studentValidationSchema from "./student.joi.validation";


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { student: studentData } = req.body
        ///validate data using joi 
        // const { error, value } = studentValidationSchema.validate(studentData)
        // const result = await studentServices.createStudentIntoDB(value) 
        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something going wrong ....',
        //         error: error?.details
        //     })
        // }
        const zodData = studentValidationSchemaWithZod.parse(studentData)
        const result = await studentServices.createStudentIntoDB(zodData)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student is created successfully",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentServices.getAllStudentFromDB()

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Get all student successfully !!!",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const result = await studentServices.getSingleStudentFromDB(studentId)


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "'Get single  student successfully !!!",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const result = await studentServices.deleteStudentFromDB(studentId)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "student deleted  successfully !!!",
            data: result
        })

    }
    catch (error) {
        next(error)
    }
}

export const studentController = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent
}
import { Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";


const createStudent = async (req: Request, res: Response) => {
    try {

        const { student: studentData } = req.body
        ///validate data using joi 
        const { error, value } = studentValidationSchema.validate(studentData)
        const result = await studentServices.createStudentIntoDB(value)
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Something going wrong ....',
                error: error?.details
            })
        }


        res.status(200).json({
            success: true,
            message: 'Student is created successfully !!!',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something going wrong ....',
            error: error
        })
    }
}
const getAllStudent = async (req: Request, res: Response) => {
    try {
        const result = await studentServices.getAllStudentFromDB()
        res.status(200).json({
            success: true,
            message: 'Get all student successfully !!!',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something going wrong ....',
            error: error
        })
    }
}
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params
        const result = await studentServices.getSingleStudentFromDB(studentId)
        res.status(200).json({
            success: true,
            message: 'Get single  student successfully !!!',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something going wrong ....',
            error: error
        })
    }
}

export const studentController = {
    createStudent,
    getAllStudent,
    getSingleStudent
}
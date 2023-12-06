
import { studentServices } from "./student.service";
import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import catchAsync from "../../utils/catchAsync";
// import studentValidationSchema from "./student.joi.validation";


const getAllStudent = catchAsync(async (req, res) => {
    const result = await studentServices.getAllStudentFromDB(req.query)

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
const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentFromDB(studentId)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "'Get single  student successfully !!!",
        data: result
    })
})
const updateStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params
    const { student } = req.body
    const result = await studentServices.updateStudentIntoDB(studentId, student)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "student updated  successfully !!!",
        data: result
    })
})
const deleteStudent = catchAsync(async (req, res) => {
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
    deleteStudent,
    updateStudent
}
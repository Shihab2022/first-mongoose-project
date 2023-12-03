
import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentService } from './department.service';
import { AcademicDepartment } from './department.model';
import AppError from '../../errors/AppError';



const createAcademicDepartment = catchAsync(async (req, res) => {

    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty is created  successfully !!!",
        data: result
    })
})
const getAllAcademicDepartment = catchAsync(async (req, res) => {

    const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all academic successfully !!!",
        data: result
    })
})


const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "'Get single  academic faculty successfully !!!",
        data: result
    })
})
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {

    const { departmentId } = req.params
    const isDepartmentExit = await AcademicDepartment.findOne({ _id: departmentId })
    /// here have an issue
    if (!isDepartmentExit) {
        throw new AppError(httpStatus.NOT_FOUND, "Department is not exit !!")
    }
    else {
        const result = await AcademicDepartmentService.updateSingleAcademicDepartmentFromDB(departmentId, req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Update Single  Academic faculty successfully !!!",
            data: result
        })
    }
})


export const DepartmentController = {
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    createAcademicDepartment,
    updateSingleAcademicDepartment
}
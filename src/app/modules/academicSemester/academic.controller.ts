
import sendResponse from "../../utils/sentResponce"
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academic.services";

const createAcademicSemester = catchAsync(async (req, res) => {

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester is created successfully !!!",
        data: result
    })
})
const getAllAcademicSemester = catchAsync(async (req, res) => {

    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch All  Academic semester successfully !!!",
        data: result
    })
})
const getSingleAcademicSemester = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(Object(id))

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch Single  Academic semester successfully !!!",
        data: result
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester

}
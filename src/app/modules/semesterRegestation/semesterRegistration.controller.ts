import catchAsync from "../../utils/catchAsync";

import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import { SemesterRegistrationService } from "./semesterRegistration.services";


const createSemesterRegistration = catchAsync(async (req, res) => {

    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester is created successfully !!!",
        data: result
    })
})
const getAllSemesterRegistration = catchAsync(async (req, res) => {

    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch All  Academic semester successfully !!!",
        data: result
    })
})
const getSingleSemesterRegistration = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(Object(id))

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch Single  Academic semester successfully !!!",
        data: result
    })
})
const updateSingleSemesterRegistration = catchAsync(async (req, res) => {

    const { id } = req.params
    const data = req.body
    const result = await SemesterRegistrationServices.updateSingleSemesterRegistrationFromDB(id, data)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Single  Academic semester successfully !!!",
        data: result
    })
})

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSingleSemesterRegistration

}
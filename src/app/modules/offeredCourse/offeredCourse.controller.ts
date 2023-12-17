import catchAsync from "../../utils/catchAsync";

import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import { OfferedCourseService } from "./offeredCourse.services";



const createOfferedCourse = catchAsync(async (req, res) => {

    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered Course is created successfully !!!",
        data: result
    })
})
const getAllOfferedCourse = catchAsync(async (req, res) => {

    const result = await OfferedCourseService.getAllOfferedCourseFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch All  Academic semester successfully !!!",
        data: result
    })
})
const getSingleOfferedCourse = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await OfferedCourseService.getSingleOfferedCourseFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration is retrieved  successfully !!!",
        data: result
    })
})
const updateSingleOfferedCourse = catchAsync(async (req, res) => {

    const { id } = req.params
    const data = req.body
    const result = await OfferedCourseService.updateOfferedCourseIntoDB(id, data)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Single  semester successfully !!!",
        data: result
    })
})

export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateSingleOfferedCourse

}
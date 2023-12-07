
import sendResponse from "../../utils/sentResponce"
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { courseService } from "./course.service";


const createCourse = catchAsync(async (req, res) => {

    const result = await courseService.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is created successfully !!!",
        data: result
    })
})
const getAllCourses = catchAsync(async (req, res) => {

    const result = await courseService.getAllCourseFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch All  Course successfully !!!",
        data: result
    })
})
const getSingleCourse = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await courseService.getSingleCourseFromDB(Object(id))

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Fetch Single  Course successfully !!!",
        data: result
    })
})
const deleteCourse = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await courseService.deleteCourseFromDB(Object(id))

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete course successfully !!!",
        data: result
    })
})
// const updateSingleAcademicSemester = catchAsync(async (req, res) => {

//     const { id } = req.params
//     const data = req.body
//     const result = await courseService.updateSingleAcademicSemesterFromDB(id, data)

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Update Single  Course successfully !!!",
//         data: result
//     })
// })

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse
    // updateSingleAcademicSemester

}
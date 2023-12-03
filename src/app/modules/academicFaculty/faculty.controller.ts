
import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyService } from './faculty.service';



const createAcademicFaculty = catchAsync(async (req, res) => {

    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty is created  successfully !!!",
        data: result
    })
})
const getAllAcademicFaculty = catchAsync(async (req, res) => {

    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all academic successfully !!!",
        data: result
    })
})


const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "'Get single  academic faculty successfully !!!",
        data: result
    })
})
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {

    const { facultyId } = req.params
    const result = await AcademicFacultyService.updateSingleAcademicFacultyFromDB(facultyId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Single  Academic faculty successfully !!!",
        data: result
    })
})


export const FacultyController = {
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    createAcademicFaculty,
    updateSingleAcademicFaculty
}
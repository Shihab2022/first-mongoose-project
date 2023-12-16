import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academic.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemesterId = payload.academicSemester

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemesterId })
    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, "This semester is already registered ! ")
    }
    ///check if the semester is exit 
    const isAcademicSemesterExit = await AcademicSemester.findById(academicSemesterId)
    if (!isAcademicSemesterExit) {
        throw new AppError(httpStatus.NOT_FOUND, "This academic semester is not found !")
    }

    const result = await SemesterRegistration.create(payload)

    return result

}
const getAllSemesterRegistrationFromDB = async () => { }
const getSingleSemesterRegistrationFromDB = async () => { }
const updateSemesterRegistrationIntoDB = async () => { }


export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}
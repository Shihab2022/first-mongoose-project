import { academicSemesterNameCodeMapper } from "./academic.constant";
import { TAcademicSemester } from "./academic.interface";
import { AcademicSemester } from "./academic.model";


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    //semester name -------> semester code


    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester code')
    }
    const result = await AcademicSemester.create(payload)

    return result
}

const getAllAcademicSemesterFromDB = async () => {

    const result = await AcademicSemester.find()

    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB
}
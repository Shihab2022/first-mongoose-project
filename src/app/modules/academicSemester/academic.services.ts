import { TAcademicSemesterCode } from "./academic.interface";
import { AcademicSemester } from "./academic.model";


const createAcademicSemesterIntoDB = async (payload: TAcademicSemesterCode) => {
    const result = await AcademicSemester.create(payload)

    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}
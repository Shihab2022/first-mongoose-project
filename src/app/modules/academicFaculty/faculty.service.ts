import { TAcademicFaculty } from "./faculty.interface";
import { AcademicFaculty } from "./faculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {

    const result = await AcademicFaculty.create(payload)
    return result


}
const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find()
    return result
}
const getSingleAcademicFacultyFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await AcademicFaculty.findById(id)
    return result
}
const updateSingleAcademicFacultyFromDB = async (id: any, payload: any) => {

    const result = await AcademicFaculty.findByIdAndUpdate(id, payload, { new: true })  // there have a problem to update , it not update real time

    return result
}
export const AcademicFacultyService = {
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    createAcademicFacultyIntoDB,
    updateSingleAcademicFacultyFromDB
}
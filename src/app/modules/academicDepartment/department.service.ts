import { TAcademicDepartment } from "./department.interface"
import { AcademicDepartment } from "./department.model"



const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

    const result = await AcademicDepartment.create(payload)
    return result


}
const getAllAcademicDepartmentFromDB = async () => {

    // here populate is use for showing referensing data 

    const result = await AcademicDepartment.find().populate('academicFaculty')
    return result
}
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await AcademicDepartment.findById(id).populate('academicFaculty')
    return result
}
const updateSingleAcademicDepartmentFromDB = async (id: any, payload: any) => {
    const result = await AcademicDepartment.findByIdAndUpdate(id, payload, { new: true })  // there have a problem to update , it not update real time

    return result
}
export const AcademicDepartmentService = {
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    createAcademicDepartmentIntoDB,
    updateSingleAcademicDepartmentFromDB
}
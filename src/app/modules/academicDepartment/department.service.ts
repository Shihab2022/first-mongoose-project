import { TAcademicDepartment } from "./department.interface"
import { AcademicDepartment } from "./department.model"



const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

    const result = await AcademicDepartment.create(payload)
    return result


}
const getAllAcademicDepartmentFromDB = async () => {
    const result = await AcademicDepartment.find()
    return result
}
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await AcademicDepartment.findById(id)
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
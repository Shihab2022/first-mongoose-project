import { Admin } from "./admin.model"

const findLastStudentId = async () => {
    const lastStudent = await Admin.findOne()
        .sort({
            createAt: 1
        })
        .lean()
    console.log('lastStudent', lastStudent)
    return lastStudent?.id ? lastStudent.id : undefined
}

export const generatedAdminId = async () => {
    // let currentId = (0).toString()
    //this fiel is change th
    const lastStudentId = await findLastStudentId()
    return lastStudentId
}
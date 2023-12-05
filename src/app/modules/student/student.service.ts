import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";


const getAllStudentFromDB = async () => {
    const result = await Student.find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }

        })
    return result
}
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    // const result = await Student.findOne({ id })
    const result = await Student.findOneAndUpdate({ id }, payload)

    return result
}
const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await Student.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }

        })
    return result
}
const deleteStudentFromDB = async (id: string) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const deleteStudent = await Student.findByIdAndUpdate({ id }, { isDeleted: true }, { new: true, session })
        if (!deleteStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
        }

        const deleteUser = await User.findByIdAndUpdate({ id }, { isDeleted: true }, { new: true, session })
        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
        }
        await session.commitTransaction()
        await session.endSession()
        return deleteStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }

}
export const studentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
}
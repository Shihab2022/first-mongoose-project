import mongoose from "mongoose"
import httpStatus from "http-status"
import config from "../../config"
import { AcademicSemester } from "../academicSemester/academic.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import { generatedStudentId } from "./user.utilis"
import AppError from "../../errors/AppError"


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    // create a user object 
    const userData: Partial<TUser> = {}

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    // set user role 
    userData.role = 'student'
    userData.email = studentData.email


    //  your semester 4 digit number

    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)

    ///--->create session
    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        userData.id = await generatedStudentId(admissionSemester)
        // set manually generated id
        // userData.id = '2010628126'

        //----> create a user (transaction - 1)

        const newUser = await User.create([userData], { session }) // it s an array
        // create a student

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user .")
        }
        // set id ,_id as user
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id // reference _id

        const newStudent = await Student.create([studentData], { session })
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student ")
        }
        await session.commitTransaction()
        await session.endSession()
        return newStudent

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong")
    }



}

export const UserServices = {
    createStudentIntoDB
}

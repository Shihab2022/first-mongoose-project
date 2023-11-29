import config from "../../config"
import { TAcademicSemester } from "../academicSemester/academic.interface"
import { AcademicSemester } from "../academicSemester/academic.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import { generatedStudentId } from "./uset.utilis"

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    // create a user object 
    const userData: Partial<TUser> = {}

    //if password is not given , use deafult password
    userData.password = password || config.default_password as string;

    // set user role 
    userData.role = 'student'


    //  your semester 4 digit number



    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)

    userData.id = await generatedStudentId(admissionSemester)
    // set manually generated id
    // userData.id = '2010628126'
    const newUser = await User.create(userData)

    // create a student

    if (Object.keys(newUser).length) {
        // set id ,_id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id // reference _id

        const newStudent = await Student.create(studentData)
        return newStudent
    }


}

export const UserServices = {
    createStudentIntoDB
}

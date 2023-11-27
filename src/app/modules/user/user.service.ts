import { TUser } from "./user.interface"
import { User } from "./user.model"

const createStudentIntoDB = async (studentData: TUser) => {
    ///------->static method
    // if (await Student.isUserExists(studentData.id)) {
    //     throw new Error("User already exits ")
    // }
    const result = await User.create(studentData)  //---built in static method
    return result
}

export const UserService = {
    createStudentIntoDB
}

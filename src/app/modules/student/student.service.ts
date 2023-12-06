import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";


const getAllStudentFromDB = async (query: Record<string, unknown>) => {

    const queryObject = { ...query } /// copy the query
    // {email :{$regex :query.searchTerm , $options :'i'}}
    // {presentAddress :{$regex :query.searchTerm , $options :'i'}}
    // {'name.firstName' :{$regex :query.searchTerm , $options :'i'}}


    let searchTerm = ''
    if (query.searchTerm) {
        searchTerm = query.searchTerm as string
    }

    const searchQuery = Student.find({
        $or: ['email', "name.firstName", "presentAddress"].map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    })
    /// Filtering 
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((ele) => delete queryObject[ele])

    console.log({ base_query: query, queryObject: queryObject })

    const filterQuery = searchQuery.find(queryObject)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }

        })

    let sort = '-createdAt'
    if (query.sort) {
        sort = query.sort as string
    }

    const sortQuery = filterQuery.sort(sort)

    ///---------->?page=1&limit=1

    let page = 1
    let limit = 1;
    let skip = 0;
    if (query.limit) {
        limit = query.limit as number
    }
    if (query.page) {
        page = Number(query.page)
        skip = (page - 1) * limit
    }
    const paginatedQuery = sortQuery.skip(skip)

    const limitQuery = paginatedQuery.limit(limit)

    ///----> if we get some specific filed then we can send data by query and then 

    //fields:"name,email" //data is come this formate
    // fields:"name email" // we need this formate

    //---> query formate --->?fields=name,email,gender

    ///---> query formate ---> if we send filed with - then it will skip this filed ?fields=-name
    let fields = '-_v';
    if (query.fields) {
        fields = (query.fields as string).split(',').join(' ')
    }
    const fieldQuery = await limitQuery.select(fields)
    return fieldQuery
}
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

    const { name, localGuardian, guardian, ...remain } = payload
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remain
    }

    /*
    guardian {
        fatherOccupation:"Teacher"
    }
    guardian.fatherOccupation="teacher"
    name.firstName="Shihab"
    */
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData)


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
        throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong")
    }

}
export const studentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
}
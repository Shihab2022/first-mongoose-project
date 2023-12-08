import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { courseSearchableFields } from "./course.constant"
import { TCourse, TCourseFaculty } from "./course.interface"
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query).search(courseSearchableFields).filter().sort().paginate().fields()

    const result = await courseQuery.modelQuery
    return result
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainData } = payload
    //step 1
    const session = await mongoose.startSession()

    try {


        session.startTransaction()

        // const updatedCourseInfo = 
        const updatedCourseInfo = await Course.findByIdAndUpdate(id, courseRemainData, { new: true, runValidators: true, session })

        if (!updatedCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
        }

        /// check if there is any pre requisite course to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            //filter out the deleted fields
            const deletedPreRequisites = preRequisiteCourses.filter((ele) => ele.course && ele.isDeleted).map(ele => ele.course)

            // const deletedPreRequisiteCourses =
            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
            }, { new: true, runValidators: true, session })

            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
            }
            //filter the new course fields
            const newPreRequisites = preRequisiteCourses?.filter((ele) => ele.course && !ele.isDeleted)

            // const newPreRequisitesCourses =
            const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
            }, { new: true, runValidators: true, session })

            if (!newPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add new course')
            }

        }

        const result = await Course.findById(id).populate("preRequisiteCourses.course")


        return result

        await session.commitTransaction()
        await session.endSession()
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add new course')
    }

}
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

    return result
}

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await CourseFaculty.findByIdAndUpdate(id, {
        $addToSet: { faculties: { $each: payload } }
    }, {
        upsert: true,
        new: true
    })

    return result
}

export const courseService = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB, deleteCourseFromDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB
}
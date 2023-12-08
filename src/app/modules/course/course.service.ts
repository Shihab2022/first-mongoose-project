import QueryBuilder from "../../builder/QueryBuilder"
import { courseSearchableFields } from "./course.constant"
import { TCourse } from "./course.interface"
import { Course } from "./course.model"

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
    // const updatedCourseInfo = 
    await Course.findByIdAndUpdate(id, courseRemainData, { new: true, runValidators: true })



    /// check if there is any pre requisite course to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        //filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses.filter((ele) => ele.course && ele.isDeleted).map(ele => ele.course)

        // const deletedPreRequisiteCourses =
        await Course.findByIdAndUpdate(id, {
            $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
        })

        //filter the new course fields
        const newPreRequisites = preRequisiteCourses?.filter((ele) => ele.course && !ele.isDeleted)

        // const newPreRequisitesCourses =
        await Course.findByIdAndUpdate(id, {
            $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
        })
    }

    const result = await Course.findById(id).populate("preRequisiteCourses.course")


    return result

}
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

    return result
}



export const courseService = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB, deleteCourseFromDB,
    updateCourseIntoDB
}
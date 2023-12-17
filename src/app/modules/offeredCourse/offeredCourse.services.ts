import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"
import { SemesterRegistration } from "../semesterRegestation/semesterRegistration.model"
import { AcademicFaculty } from "../academicFaculty/faculty.model"
import { AcademicDepartment } from "../academicDepartment/department.model"
import { Course, CourseFaculty } from "../course/course.model"
import { hasTimeConflict } from "./offer.Course.utils"


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload

    // check if the semester registration id is exit

    const isSemesterRegistrationExit = await SemesterRegistration.findById(semesterRegistration)

    if (!isSemesterRegistrationExit) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester is not found !')
    }
    const academicSemester = isSemesterRegistrationExit.academicSemester
    const isAcademicFacultyExit = await AcademicFaculty.findById(academicFaculty)

    if (!isAcademicFacultyExit) {
        throw new AppError(httpStatus.NOT_FOUND, 'AcademicFaculty is not found !')
    }
    const isAcademicDepartmentExit = await AcademicDepartment.findById(academicDepartment)

    if (!isAcademicDepartmentExit) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is not found !')
    }
    const isCourseExit = await Course.findById(course)

    if (!isCourseExit) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course is not found !')
    }
    const isFacultyExit = await CourseFaculty.findById(faculty)

    if (!isFacultyExit) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found !')
    }

    // check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty
    })
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, `${academicDepartment} is not belong to this ${academicFaculty}`)
    }


    /// check if the same offer course same section in same registered semester exits
    const isSameOfferedcourseExitsWithSamesterWithSameSection = await OfferedCourse.findOne({ semesterRegistration, course, section })

    if (isSameOfferedcourseExitsWithSamesterWithSameSection) {
        throw new AppError(httpStatus.BAD_REQUEST, `Offered course is already exits`)
    }

    // get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select("days startTime endTime")


    const newSchedule = {
        days, startTime, endTime
    }

    // 10:30-12:30
    // 11.30-1.30
    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(httpStatus.CONFLICT, `This faculty is not avilable in this time . please choose another time `)
    }







    const result = await OfferedCourse.create({ ...payload, academicSemester })
    return result
}
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {

    const OfferedCourseQuery = new QueryBuilder(OfferedCourse.find().populate("academicSemester"), query).filter().sort().paginate().fields();

    const result = await OfferedCourseQuery.modelQuery

    return result
}
const getSingleOfferedCourseFromDB = async (id: string) => {

    const result = await OfferedCourse.findById(id)
    return result

}
const updateOfferedCourseIntoDB = async (id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {

    const { faculty, days, startTime, endTime } = payload
    const isOfferedCourseExits = await OfferedCourse.findById(id)
    if (!isOfferedCourseExits) {
        throw new AppError(httpStatus.NOT_FOUND, `Offered course not found`)

    }
    const isFacultyExit = await CourseFaculty.findById(faculty)
    if (!isFacultyExit) {
        throw new AppError(httpStatus.NOT_FOUND, `Faculty is not found`)
    }

    const semesterRegistration = isOfferedCourseExits.semesterRegistration
    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
    if (semesterRegistrationStatus?.status !== "UPCOMING") {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not update this offered course it is ${semesterRegistrationStatus?.status} `)
    }
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select("days startTime endTime")

    const newSchedule = {
        days, startTime, endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(httpStatus.CONFLICT, `This faculty is not avilable in this time . please choose another time `)
    }
    const result = await OfferedCourse.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}


export const OfferedCourseService = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}
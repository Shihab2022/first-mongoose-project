import { Types } from "mongoose"
import { Days } from "./offeredCourse.constant"

export type TOfferedCourse = {
    semesterRegistration: Types.ObjectId,
    academicSemester?: Types.ObjectId,
    academicFaculty: Types.ObjectId,
    academicDepartment: Types.ObjectId,
    course: Types.ObjectId,
    faculty: Types.ObjectId,
    maxCapacity: number,
    section: number,
    days: Days[],
    startTime: string,
    endTime: string,
}

export type TSchedule = {
    days: Days[],
    startTime: string,
    endTime: string
}
import { z } from "zod";
import { DaysEnum } from "./offeredCourse.constant";



const createOfferedCourseValidation = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        // academicSemester: z.string(), //--- this course add on backend
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum([...DaysEnum] as [string, ...string[]])),
        startTime: z.string(),
        endTime: z.string(),
    })
})
const updateOfferedCourseValidation = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.enum([...DaysEnum] as [string, ...string[]]).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    })
})

export const OfferedCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
}


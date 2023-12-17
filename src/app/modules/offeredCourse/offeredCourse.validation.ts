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
        startTime: z.string().refine((time) => {
            const regex = /^[01]?[0-9]|2[0-3]:[0-5][0-9]/ ///00-09 10-19 20-23
            return regex.test(time)
        }, {
            message: "Invalid time formate , expected 'HH:MM' in 24 hours formate"
        }),
        endTime: z.string().refine((time) => {
            const regex = /^[01]?[0-9]|2[0-3]:[0-5][0-9]/ ///00-09 10-19 20-23
            return regex.test(time)
        }, {
            message: "Invalid time formate , expected 'HH:MM' in 24 hours formate"
        }),
    })
    // .refine(({ body }) => {
    //     // for compare time we let a random time for campare
    //     // start time : 10:30 ===> 2000-01-01T10:30
    //     // end time : 12:30 ===> 2000-01-01T12:30
    //     const start = new Date(`2000-01-01T${body.startTime}`)
    //     const end = new Date(`2000-01-01T${body.endTime}`)
    //     return end > start
    // }, {
    //     message: "Start time should be before end time"
    // })
})
const updateOfferedCourseValidation = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.enum([...DaysEnum] as [string, ...string[]]).optional(),
        startTime: z.string().refine((time) => {
            const regex = /^[01]?[0-9]|2[0-3]:[0-5][0-9]/ ///00-09 10-19 20-23
            return regex.test(time)
        }, {
            message: "Invalid time formate , expected 'HH:MM' in 24 hours formate"
        }).optional(),
        endTime: z.string().refine((time) => {
            const regex = /^[01]?[0-9]|2[0-3]:[0-5][0-9]/ ///00-09 10-19 20-23
            return regex.test(time)
        }, {
            message: "Invalid time formate , expected 'HH:MM' in 24 hours formate"
        }).optional(),
    })
})

export const OfferedCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
}


import { z } from "zod";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRegistrationValidation = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...semesterRegistrationStatus as [string, ...string[]]]),
        startData: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number(),
    })
})
const updateSemesterRegistrationValidation = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...semesterRegistrationStatus as [string, ...string[]]]).optional(),
        startData: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
    })
})

export const SemesterRegistrationValidation = {
    createSemesterRegistrationValidation,
    updateSemesterRegistrationValidation
}
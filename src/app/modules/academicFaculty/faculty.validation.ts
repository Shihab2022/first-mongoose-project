import { z } from "zod";

const academicFacultyValidation = z.object({
    body:
        z.object({
            name: z.string({
                invalid_type_error: 'Academic faculty must be string'
            }),
            isDeleted: z.boolean().optional()
        })

})

export const facultyValidation = {
    academicFacultyValidation
}
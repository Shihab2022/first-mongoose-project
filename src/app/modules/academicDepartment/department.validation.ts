import { z } from "zod";

const academicDepartmentValidation = z.object({
    body:
        z.object({
            name: z.string({
                invalid_type_error: 'Academic department must be string',
                required_error: 'Academic department is required'
            }),
            academicFaculty: z.string({
                invalid_type_error: 'Academic Faculty must be string',
                required_error: 'Academic Faculty is required'
            })
        })

})

export const departmentValidation = {
    academicDepartmentValidation
}
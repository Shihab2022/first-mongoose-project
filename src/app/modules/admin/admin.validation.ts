import { z } from "zod";

const adminValidationSchema = z.object({
    body: z.object({
        email: z.string({ invalid_type_error: "please put valid email" }).email({ message: "Your gmail is not valid " }),
        password: z.string().max(20),
        needsPasswordChange: z.boolean().optional(),
        role: z.enum(['admin']).optional(),
        status: z.enum(['in-progress', 'blocked']).optional(),
        isDeleted: z.boolean().optional()


    })
})

export const adminValidation = {
    adminValidationSchema
}
import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(50),
    middleName: z.string().max(50),
    lastName: z.string().min(1).max(50),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().min(1).max(50),
    fatherOccupation: z.string().min(1).max(50),
    fatherContactNo: z.string().min(1).max(20),
    motherName: z.string().min(1).max(50),
    motherOccupation: z.string().min(1).max(50),
    motherContactNo: z.string().min(1).max(20),
});

const localGuardianValidationSchema = z.object({
    name: z.string().min(1).max(50),
    occupation: z.string().min(1).max(50),
    connectNo: z.string().min(1).max(20),
    address: z.string().min(1).max(100),
});

const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string(),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(["female", "male", "other"]),
            dateOfBirth: z.date().optional(),
            email: z.string().email(),
            connectNmu: z.string().min(1).max(20),
            emergencyContactNum: z.string().min(1).max(20),
            bloodGroup: z.enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]),
            presentAddress: z.string().min(1).max(100),
            permanentAddress: z.string().min(1).max(100),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: z.string(),
        })
    })
})

export const studentValidation = {
    createStudentValidationSchema
}


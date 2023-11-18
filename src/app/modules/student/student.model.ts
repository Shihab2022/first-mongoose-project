import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const nameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: true,

    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    }
})
const guardianSchema = new Schema<Guardian>(
    {
        fatherName: {
            type: String,
            required: true,
        },
        fatherOccupation: {
            type: String,
            required: true,
        },
        fatherContactNo: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        motherOccupation: {
            type: String,
            required: true,
        },
        motherContactNo: {
            type: String,
            required: true,
        }
    }
)

const localGuardianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    connectNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
})


const studentSchema = new Schema<Student>({
    id: { type: String },
    name: nameSchema,
    gender: { type: String, enum: ["female", "male", "other"], required: true }, ///this is mongoose enam type as like ts union type
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    connectNmu: { type: String, required: true },
    emergencyContactNum: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],

    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String, required: false },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
})

export const StudentModel = model<Student>('Student', studentSchema)
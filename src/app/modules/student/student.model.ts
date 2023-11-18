import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const nameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required '], ///---->for showing custom error

    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required '],
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
    id: { type: String, required: true, unique: true }, ///unique is use to ensure to dublicate the value 
    name: { type: nameSchema, required: true },
    gender: {
        type: String,
        enum: {
            values: ["female", "male", "other"],
            message: '{VALUE}  is not valid .'  // here {VALUE} is giving that user put 
        },
        required: true
    }, ///this is mongoose enam type as like ts union type
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    connectNmu: { type: String, required: true },
    emergencyContactNum: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],

    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String, required: false },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
})

export const StudentModel = model<Student>('Student', studentSchema)
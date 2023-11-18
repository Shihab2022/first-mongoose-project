import { Schema, model, connect } from 'mongoose';
import { Student } from './student.interface';

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: {
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
    },
    gender: ["female", "male"], ///this is mongoose enam type as like ts union type
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    connectNmu: { type: String, required: true },
    emergencyContactNum: { type: String, required: true },
    bloodGroup: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
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
    },
    localGuardian: {
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
    },
    profileImg: { type: String, required: false },
    isActive: ['active', 'blocked']


})
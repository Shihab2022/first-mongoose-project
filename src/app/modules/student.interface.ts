import { Schema, model, connect } from 'mongoose';

export type Student = {
    id: string;
    name: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    gender: 'male' | 'female';
    dateOfBirth: string;
    email: string;
    connectNmu: string;
    emergencyContactNum: string;
    bloodGroup?: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;

}

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}
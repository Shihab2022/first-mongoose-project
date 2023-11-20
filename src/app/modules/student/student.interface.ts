
import { Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    connectNo: string;
    address: string
}
export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}
export type TStudent = {
    id: string;
    password: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    connectNmu: string;
    emergencyContactNum: string;
    bloodGroup?: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked'

}

// Creating a static instance method /

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}








//-------->Creating a custom instance method

// export type StudentMethods = {
//     isUserExits(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;
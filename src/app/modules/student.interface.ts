


// 1. Create an interface representing a document in MongoDB.

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type LocalGuardian = {
    name: string;
    occupation: string;
    connectNo: string;
    address: string
}
export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}
export type Student = {
    id: string;
    name: UserName;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    email: string;
    connectNmu: string;
    emergencyContactNum: string;
    bloodGroup?: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked'

}

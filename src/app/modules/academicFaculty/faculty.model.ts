import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./faculty.interface";


const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

export const AcademicFaculty = model<TAcademicFaculty>(
    'AcademicFaculty', academicFacultySchema
)
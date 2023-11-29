import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academic.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academic.constant";



const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode,
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
    },

},
    {
        timestamps: true
    }
)


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)
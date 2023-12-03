import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./department.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }
}, {
    timestamps: true
})



academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExit = await AcademicDepartment.findOne({
        name: this.name
    })
    if (isDepartmentExit) {
        throw new AppError(httpStatus.NOT_FOUND, "This department is already exits !")
    }

    next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment', academicDepartmentSchema
)
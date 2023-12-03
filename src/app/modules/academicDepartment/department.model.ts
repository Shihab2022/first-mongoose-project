import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./department.interface";


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
        throw new Error("This department is already exits !")
    }

    next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment', academicDepartmentSchema
)
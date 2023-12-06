import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, StudentModel, TUserName } from './student.interface';
// import bcrypt from 'bcrypt'
// import config from '../../config';
// import validator from 'validator';
const nameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    }
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father\'s name is required'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father\'s occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father\'s contact number is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother\'s name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother\'s occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother\'s contact number is required'],
    }
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local guardian\'s name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Local guardian\'s occupation is required'],
    },
    address: {
        type: String,
        required: [true, 'Local guardian\'s address is required'],
    },
});

const studentSchema = new Schema<TStudent, StudentModel>(
    {
        id: {
            type: String,
            required: [true, 'ID is required'],
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            unique: true,
            ref: 'User',
        },
        name: {
            type: nameSchema,
            required: [true, 'Name is required'],
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other'],
                message: '{VALUE} is not a valid gender',
            },
            required: [true, 'Gender is required'],
        },
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        contactNo: { type: String, required: [true, 'Contact number is required'] },
        emergencyContactNo: {
            type: String,
            required: [true, 'Emergency contact number is required'],
        },
        bloodGroup: {
            type: String,
            enum: {
                values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                message: '{VALUE} is not a valid blood group',
            },
        },
        presentAddress: {
            type: String,
            required: [true, 'Present address is required'],
        },
        permanentAddress: {
            type: String,
            required: [true, 'Permanent address is required'],
        },
        guardian: {
            type: guardianSchema,
            required: [true, 'Guardian information is required'],
        },
        localGuardian: {
            type: localGuardianSchema,
            required: [true, 'Local guardian information is required'],
        },
        profileImg: { type: String },
        admissionSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

//-------> virtual for add a new field <----------

studentSchema.virtual('fullName').get(function () {
    return (
        `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
    )
})



///------>Query Middleware <---------///

studentSchema.pre('find', function (next) {
    // console.log(this)
    this.find({ isDeleted: { $ne: true } })
    next()
})
studentSchema.pre('findOne', function (next) {
    // console.log(this)
    this.find({ isDeleted: { $ne: true } })
    next()
})


//--->for aggregate 

studentSchema.pre('aggregate', function (next) {
    // console.log(this)
    this.pipeline().unshift({ $match: { isDeleted: true } })
    next()
})













///----> pre save middleware / hook : will work on create / save
// studentSchema.pre('save', async function (next) {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const user = this;
//     ///hashing password and save into db
//     user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
//     next()
// })

//------> post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//     doc.password = ''
//     next()
// })








//----.Creating a custom STATIC   method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id })
    return existingUser

}


/// ---> Creating a custom instance method 
// studentSchema.methods.isUserExits = async function (id: string) {
//     const existingUser = await Student.findOne({ id })

//     return existingUser
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
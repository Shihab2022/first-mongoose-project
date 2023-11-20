import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, StudentModel, TUserName } from './student.interface';
import bcrypt from 'bcrypt'
import config from '../../config';
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
    connectNo: {
        type: String,
        required: [true, 'Local guardian\'s contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Local guardian\'s address is required'],
    },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: [true, 'Student ID is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    name: {

        type: nameSchema,
        required: [true, 'Student name is required'],
        maxLength: [10, "First name length maximum 10 charecter ...."], //this is set limit who many charectar are received...
        trim: true, ///this is use If there have any space first or last in our value then it will give error

        //----> If we want ot create custom  validater function then 
        // validate: {
        //     validator: function (value: string) {
        //         const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        //         return firstNameStr === value;

        //     },
        //     message: '{VALUE} is not capitalize formate .',
        // },

    },
    gender: {
        type: String,
        enum: {
            values: ["female", "male", "other"],
            message: '{VALUE} is not valid. Please select from ["female", "male", "other"]',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: [true, 'Email is required'], unique: true,
        ///---If we want to validate email we can use the package 
        // validate: {
        //     validator: (value: string) => validator.isEmail(value),
        //     message: '{VALUE}  is not valid email.'
        // }

    },
    connectNmu: { type: String, required: [true, 'Connect NMU is required'] },
    emergencyContactNum: { type: String, required: [true, 'Emergency contact number is required'] },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    },
    presentAddress: { type: String, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
    guardian: { type: guardianSchema, required: [true, 'Guardian details are required'] },
    localGuardian: { type: localGuardianSchema, required: [true, 'Local guardian details are required'] },
    profileImg: { type: String, required: false },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});


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















///----> pre save middleware / hook : will work on create / save
studentSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    ///hashing password and save into db
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next()
})

//------> post save middleware / hook
studentSchema.post('save', function (doc, next) {
    doc.password = ''
    next()
})








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
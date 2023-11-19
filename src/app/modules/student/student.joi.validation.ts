import Joi from 'joi';

const userNameValidationSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    middleName: Joi.string().trim().allow('').optional(),
    lastName: Joi.string().trim().required(),
});

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
    motherContactNo: Joi.string().trim().required(),
});

const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    connectNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
});

const studentValidationSchema = Joi.object({
    id: Joi.string().allow('').optional(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('female', 'male').required(),
    dateOfBirth: Joi.string().allow('').optional(),
    email: Joi.string().email().required(),
    connectNmu: Joi.string().trim().required(),
    emergencyContactNum: Joi.string().trim().required(),
    bloodGroup: Joi.string().valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-').allow('').optional(),
    presentAddress: Joi.string().trim().required(),
    permanentAddress: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().allow('').optional(),
    isActive: Joi.string().valid('active', 'blocked').required(),
});

export default studentValidationSchema
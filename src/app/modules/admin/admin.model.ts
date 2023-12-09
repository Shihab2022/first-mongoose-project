import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: {
            values: ['admin'],
        }
    },
    status: {
        type: String,
        enum: {
            values: ['in-progress', 'blocked'],
        },
        default: "in-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export const Admin = model<TAdmin>('admin', adminSchema)
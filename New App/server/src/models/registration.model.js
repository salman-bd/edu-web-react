import mongoose, { Schema } from "mongoose"
// import jwt from "json-web-token";
import jwt from "jsonwebtoken";

const registrationSchema = new Schema(
    {
        registrationHeadline: {
            type: String,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        institutionName: {
            type: String,
            required: true,
            trim: true
        },
        contact: {
            type: String,
            required: true,
            trim: true
        },
        medium: {
            type: String,
            trim: true
        },
        grade: {
            type: String,
            required: true,
            trim: true
        },
        fatherName: {
            type: String,
            required: true,
            trim: true
        },
        motherName: {
            type: String,
            required: true,
            trim: true
        },
        photo: {
            type: String,
        },
        registrationNumber: {
            type: String,
            unique: true,
            trim: true
        },
        examVenue: {
            type: String
        },
        examDate: {
            type: String
        },
        examTime: {
            type: String
        },
        isMedhaSelected: {
            type: String,
            trim: true
        },
        isChitrangkanSelected: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
    }
)

registrationSchema.methods.generateRegistrationToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REGISTRATION_TOKEN_SECRET,
        {
            expiresIn: process.env.REGISTRATION_TOKEN_EXPIRY
        }
    );
};



export const Registration = mongoose.model("Registration", registrationSchema);
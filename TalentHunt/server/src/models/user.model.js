import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt";
// import jwt from "json-web-token";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        username: {
            type: String,
        },
        picture: {
            type: String
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    // isModified("password") checks if the password field of the document has been modified since it was last saved
    this.password = await bcrypt.hash(this.password, 10);
    next();
}); 

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};
userSchema.methods.generateRegistrationToken = async function () {
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



export const User = mongoose.model("User", userSchema);
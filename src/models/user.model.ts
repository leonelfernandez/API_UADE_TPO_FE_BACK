import { Schema, model } from "mongoose";
import { BaseUser } from "../interfaces/user.interface";


const userSchema = new Schema<BaseUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    active: Boolean,
    tokens: {
        confirmationToken: String,
        confirmationTokenExpiration: Date,
        resetPasswordToken: String,
        resetPasswordTokenExpiration: Date,
    }
})

const User = model<BaseUser>("User", userSchema);

export default User;
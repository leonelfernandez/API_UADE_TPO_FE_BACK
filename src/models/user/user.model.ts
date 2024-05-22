import { Schema, model } from "mongoose";
import { BaseUser } from "./user.interface";




const userSchema = new Schema<BaseUser>({
   username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    lists: {
        type: [],
        default: []
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
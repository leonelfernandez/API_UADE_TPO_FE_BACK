import { Schema, model } from "mongoose";
import { BaseUser } from "./user.interface";
import { List } from "../list/list.interface";
import  ListSchema from "../list/list.model";



const userSchema = new Schema<BaseUser>({
    id: {
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
        type: [ListSchema],
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
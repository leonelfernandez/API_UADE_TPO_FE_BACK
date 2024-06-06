import { Schema, model } from "mongoose";
import { BaseUser } from "./user.interface";
import { listSchema } from "../list/list.model";
import { UUID } from "mongodb";
import { List } from "../list/list.interface";




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
        type: [listSchema],
        required: true,
        default: (): List[] => [
            {
              title: "Por ver",
              films: [],
              canDelete: false,
              tag: "to_watch"
            },
            {
              title: "Preferidas",
              films: [],
              canDelete: false,
              tag: "favorite"
            },
            {
              title: "Vistas",
              films: [],
              canDelete: false,
              tag: "watched"
            },
          ]
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
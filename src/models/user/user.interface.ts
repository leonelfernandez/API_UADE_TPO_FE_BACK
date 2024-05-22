// src/items/user.interface.ts

import { Document, ObjectId } from "mongoose";
import { List } from "../list/list.interface";


export interface Tokens {
    confirmationToken?: string;
    confirmationTokenExpiration?: number;
    resetPasswordToken?: string;
    resetPasswordTokenExpiration?: number;
}
export interface BaseUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    lists: List[];
    active?: boolean;
    tokens: Tokens;

}

export interface ExtendedUser extends BaseUser {
    _id: ObjectId;
}
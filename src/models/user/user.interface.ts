// src/items/user.interface.ts

import { Document, ObjectId } from "mongoose";


export interface Tokens {
    confirmationToken?: string;
    confirmationTokenExpiration?: number;
    resetPasswordToken?: string;
    resetPasswordTokenExpiration?: number;
}
export interface BaseUser extends Document {
    name: string;
    email: string;
    password: string;
    active?: boolean;
    tokens: Tokens;

}

export interface ExtendedUser extends BaseUser {
    _id: ObjectId;
}
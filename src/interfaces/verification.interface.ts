import { ObjectId } from "mongoose";

export interface BaseVerification {
    token: string;
    userId: ObjectId;
}

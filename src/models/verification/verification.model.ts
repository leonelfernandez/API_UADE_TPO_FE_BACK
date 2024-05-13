import { Schema, model } from "mongoose";
import { BaseVerification } from "./verification.interface";


const verificationSchema = new Schema<BaseVerification>({
   token: {
       required: true,
       type: String,
   },
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true,
   }
})

const Verification = model<BaseVerification>("Verification", verificationSchema);

export default Verification;
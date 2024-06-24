import HttpException from "../common/http-exception";
import { ExtendedUser } from "../models/user/user.interface";
import User from "../models/user/user.model";

export const findById = async (id: string) => {
    let user: ExtendedUser | null = null;
  
    try {
      user = await User.findOne({ _id: id, active: true }).lean();
  
      if (!user) {
        const err = new HttpException(422, "El usuario no existe o la cuenta no ha sido confirmada.");
        throw err;
      }
    } catch (err) {
      throw err;
    }
  
    return user;
  };
  
  export const findByEmail = async (email: string) => {
    let user: ExtendedUser | null = null;
    console.log(email);
    try {
      user = await User.findOne({ email: email, active: true });
  
      if (!user) {
        const err = new HttpException(422, "El usuario no existe o la cuenta no ha sido confirmada.");
        throw err;
      }
    } catch (err) {
      throw err;
    }
  
    return user;
  };
import HttpException from "../common/http-exception";
import { BaseUser, ExtendedUser } from "../interfaces/user.interface";
import User from "../models/user.model";

const getUser = async (email: string) => {
    let user: ExtendedUser | null = null;
  
    try {
        
        user = await User.findOne({ email: email });
        if (!user) throw new HttpException(422, "User doesn't exist.");
        
    } catch (err) {
      throw err;
    }
  
    return user;
  };




export { getUser };


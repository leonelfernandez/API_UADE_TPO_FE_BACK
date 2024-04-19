import { Auth } from "../interfaces/auth.interface";
import { BaseUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { encrypt, verify } from "../utils/bcrypt.handle";
import { signToken } from "../utils/jwt.handle";

const registerNewUser = async( { email, password, name }: BaseUser) => {
    const checkIs = await UserModel.findOne({ email });
    if(checkIs) return "ALREADY_USED";
    const passwordHashed = await encrypt(password);
    const registerNewUser = await UserModel.create({ email, password: passwordHashed, name });
    return registerNewUser;
};

const loginUser = async( { email, password }: Auth ) => {
    const checkIs = await UserModel.findOne({ email });
    if(!checkIs) return "NOT_FOUND_USER";

    const passwordHashed = checkIs.password;
    const isCorrect = await verify(password, passwordHashed);

    if (!isCorrect) return "INVALID_PASSWORD";
    
    const token = signToken(checkIs.email);

    return { token, user: checkIs };
};





export { registerNewUser, loginUser };  
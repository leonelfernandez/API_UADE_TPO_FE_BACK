import { hash, compare } from "bcryptjs";


const encrypt = async( password: string ) => {
    const passwordHash = await hash(password, 8);
    return passwordHash;
}


const verify = async( password: string, passwordHashed: string) => {
    const isCorrect = await compare(password, passwordHashed);
    return isCorrect;
}


export { encrypt, verify };
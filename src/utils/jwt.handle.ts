import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.010101";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

const signToken = (id: string) => {
    const jwt = sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return jwt;
};

const verifyToken = (jwt: string) => {
    return verify(jwt, JWT_SECRET);
};


export { signToken, verifyToken };
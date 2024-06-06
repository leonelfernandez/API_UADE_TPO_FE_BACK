import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import HttpException from "../common/http-exception";
import * as dotenv from "dotenv";

dotenv.config();

type JWToken = jwt.JwtPayload & { userId: string };

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("Authorization");
    
    if(!token) return;

    let decodedToken: JWToken;

    try {
        decodedToken = jwt.verify(token, JWT_SECRET) as JWToken;
    } catch(err) {
        throw err;
    }
    
    if(!decodedToken) {
        const err = new HttpException(401, "No autenticado.")
        throw err;
    }

    req.userId = decodedToken?.userId;
    next();
};



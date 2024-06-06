import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import HttpException from "../common/http-exception";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("Authorization");
    
    if(!token) return;

    let decodedToken: any;

    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
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



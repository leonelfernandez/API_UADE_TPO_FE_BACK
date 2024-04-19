import { Response, NextFunction } from "express";
import HttpException from "../common/http-exception";
import * as dotenv from "dotenv";
import { RequestExt } from "../interfaces/request-ext.interface";
import { verifyToken } from "../utils/jwt.handle";

dotenv.config();


const checkJwt = (req: RequestExt, _: Response, next: NextFunction) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        
        if(!jwt) throw new HttpException(401, "Not authenticated.");
        const isUser = verifyToken(jwt) as { id: string };
        
        if (!isUser) throw new HttpException(401, "Not authenticated.");
        req.user = isUser;
        next();

    } catch(err) {
        throw err;
    }

};


export { checkJwt };


import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpException from "../common/http-exception";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log(errors.array())

    if (!errors.isEmpty()) {
      const [ { msg } ] = errors.array();
      const error = new HttpException(
        422,
        msg
      );
      throw error;
    }

    next();
};



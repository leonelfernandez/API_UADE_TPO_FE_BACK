import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpException from "../common/http-exception";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log(errors.array())

    if (!errors.isEmpty()) {
      const error = new HttpException(
        422,
        "Validation failed, entered data is incorrect."
      );
      throw error;
    }

    next();
};



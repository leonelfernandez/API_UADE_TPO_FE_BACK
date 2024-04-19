import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpException from "../common/http-exception";

export const validateFields = (req: Request, _: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log(errors.array())

    if (!errors.isEmpty()) {
      throw new HttpException(
        422,
        "Validation failed, entered data is incorrect."
      );
    }

    next();
};



// src/middleware/error.middleware.ts

import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
    console.log(error)
  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};

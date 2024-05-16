import { NextFunction, Request, Response, Errback } from "express";
import HttpException from "../common/http-exception";
import * as AuthService from "../services/auth.service";
import { hash, verify } from "argon2";
import User from "../models/user/user.model";
import { validationResult } from "express-validator";
import { Tokens } from "../models/user/user.interface";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {

    const hashedPw = await hash(password);

    const user = new User({
      username,
      email,
      password: hashedPw,
      active: false,
    });

    const userCreated = await user.save();

    const emailData: Tokens = {
      confirmationToken: await AuthService.createToken(),
      confirmationTokenExpiration: Date.now() + 3600000,
    };

    await AuthService.generateEmail(user, emailData, "ActivateAccount");

    res.status(201).json({
      message: "User created!",
      userId: userCreated._id,
    });
  } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 422;
      err.message = "Validation failed";
    }

    next(err);
  }
};

export const confirmAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;

  try {
    let user = await User.findOne({
      "tokens.confirmationToken": token,
      "tokens.confirmationTokenExpiration": { $gt: Date.now() },
    });

    if (!user) {
      const err = new HttpException(
        422,
        "User doesn't exist or the account has been already confirmed."
      );
      throw err;
    }

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          active: true,
        },
        $unset: {
          "tokens.confirmationToken": 1,
          "tokens.confirmationTokenExpiration": 1,
        },
      }
    );

    res.status(201).json({
      message: "User updated!",
      active: true
    });
  } catch (error: any) {
    next({
      ...error,
      active: false
    });
  }
};

export const sendResetPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
  const email: string = req.body.email;

  try {
    const user = await AuthService.findByEmail(email);

    const emailData: Tokens = {
      resetPasswordToken: await AuthService.createToken(),
      resetPasswordTokenExpiration: Date.now() + 3600000,
    };

    await AuthService.generateEmail(user, emailData, "ResetPassword");

    res.status(201).json({
      message: "Email sent!",
    });
  } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 500;
    }

    next(err);
  }
};


export const grantAccessToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.params.token;

  try {
    let user = await User.findOne({
      "tokens.resetPasswordToken": token,
      "tokens.resetPasswordTokenExpiration": { $gt: Date.now() },
    });

    if (!user) {
      const err = new HttpException(
        422,
        "User doesn't exist or the account has been already confirmed."
      );
      throw err;
    }

    res.status(200).json({email: user.email});
  } catch(err: any) {
    next(err);
  }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    
    try {
      const hashedPw = await hash(password);

      await User.updateOne({"email": email}, {
        $set: {
          "password": hashedPw,
        },
        $unset: {
          "tokens.resetPasswordToken": 1,
          "tokens.resetPasswordTokenExpiration": 1,
        },
      })

      res.status(200).json({message: "Password changed!"})
    } catch (err: any) {
      next(err);
    }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

  try {
    const user = await AuthService.findByEmail(email);


    const verifyUser = await verify(user!.password, password);

    if (!verifyUser) {
      const error = new HttpException(
        422,
        "Wrong password. Try again or click ‘Forgot your password?’ to reset it."
      );
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    )

    res.status(200).json({
      jwt: token
    });
  } catch (err: any) {
    next(err);
  }
};

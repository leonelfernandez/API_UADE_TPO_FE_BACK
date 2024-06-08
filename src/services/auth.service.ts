// src/items/user.service.ts

/**
 * Data Model Interfaces
 */

import { BaseUser, ExtendedUser } from "../models/user/user.interface";
import User from "../models/user/user.model";
import HttpException from "../common/http-exception";
import { AcceptedEmailsOperations } from "./email-builder";
import { EmailBuilder } from "./email-builder.service";
import * as TokenService from "./token.service";
import * as UserService from "./user.service";
import { hash, verify } from "argon2";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();


export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const hashedPw = await hash(password);

    const user = new User({
      username,
      email,
      password: hashedPw,
      active: false,
    });

    await user.save();
    await _generateEmail(user, "ActivateAccount");
  } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 422;
      err.message = "Validation failed";
    }

    throw err;
  }
};

export const activateAccount = async (token: string) => {
  try {
    const user = await TokenService.getTokenValidity(token, "ActivateAccount");

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
  } catch (err: any) {
    throw {
      ...err,
      active: false,
    };
  }
};

export const login = async (email: string, password: string) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

  try {
    const user = await UserService.findByEmail(email);

    const verifyUser = await verify(user!.password, password);

    if (!verifyUser) {
      const error = new HttpException(
        422,
        "Contraseña incorrecta. Inténtalo de nuevo o haz clic en '¿Olvidaste tu contraseña?' para restablecerla."
      );
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );

    return token;
  } catch (err) {
    throw err;
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  try {
    const user = await UserService.findByEmail(email);

    await _generateEmail(user, "ResetPassword");
  } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 500;
    }

    throw err;
  }
};

export const grantAccessToResetPassword = async (token: string) => {
  try {
    const user = await TokenService.getTokenValidity(token, "ResetPassword");
    return user;
  } catch (err) {
    throw err;
  }
};

export const resetPassword = async (email: string, password: string) => {
  try {
    const hashedPw = await hash(password);

    await User.updateOne(
      { email: email },
      {
        $set: {
          password: hashedPw,
        },
        $unset: {
          "tokens.resetPasswordToken": 1,
          "tokens.resetPasswordTokenExpiration": 1,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};


const _generateEmail = async (
  user: BaseUser,
  action: AcceptedEmailsOperations
) => {
  user.tokens = await TokenService.getTokens(action);

  try {
    await new EmailBuilder(user).generateEmailTemplate(action).sendEmail();
    await user.save();
  } catch (error: any) {
    error.statusCode = 500;
    throw error;
  }
};
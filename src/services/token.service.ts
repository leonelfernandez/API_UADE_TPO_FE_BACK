import { randomBytes } from "crypto";
import HttpException from "../common/http-exception";
import { BaseUser, Tokens } from "../models/user/user.interface";
import { AcceptedEmailsOperations } from "./email-builder";
import User from "../models/user/user.model";

const TOKEN_EXPIRATION_TIME = 3600000; // 1 hour

export const getTokens = async (
  action: AcceptedEmailsOperations
): Promise<Tokens> => {
  const token = await _createToken();
  const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;

  switch (action) {
    case "ActivateAccount":
      return {
        confirmationToken: token,
        confirmationTokenExpiration: expirationTime,
      };
    case "ResetPassword":
      return {
        resetPasswordToken: token,
        resetPasswordTokenExpiration: expirationTime,
      };
    default:
      throw new HttpException(422, "Operación no permitida.");
  }
};

export const getTokenValidity = async (
  token: string,
  action: AcceptedEmailsOperations
): Promise<BaseUser> => {
  let user: BaseUser | null = null;

  try {
    const tokenProperties = {
      ActivateAccount: "confirmationToken",
      ResetPassword: "resetPasswordToken",
    } as const;

    const expirationProperties = {
      ActivateAccount: "confirmationTokenExpiration",
      ResetPassword: "resetPasswordTokenExpiration",
    } as const;

    user = await User.findOne({
      [`tokens.${tokenProperties[action]}`]: token,
      [`tokens.${expirationProperties[action]}`]: { $gt: Date.now() },
    });

    if (!user) {
      throw new HttpException(
        422,
        "El usuario no existe o la cuenta ya ha sido confirmada."
      );
    }

    return user;
  } catch (err) {
    throw err;
  }
};

const _createToken = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    randomBytes(32, async (err, buffer) => {
      let token: string = "";
      if (err) {
        const error = new HttpException(422, "Error al generar token");
        reject(error);
      }

      token = buffer.toString("hex");
      resolve(token);
    });
  });
};

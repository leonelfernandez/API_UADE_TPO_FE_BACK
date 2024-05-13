// src/items/user.service.ts

/**
 * Data Model Interfaces
 */

import { BaseUser, ExtendedUser, Tokens } from "../models/user/user.interface";
import User from "../models/user/user.model";
import { randomBytes } from "crypto";
import HttpException from "../common/http-exception";
import { AcceptedEmailsOperations } from "./email-builder";
import { EmailBuilder } from "./email-builder.service";

/**
 * Service Methods
 */

export const find = async (email: string) => {
  let user: ExtendedUser | null = null;

  try {
    user = await User.findOne({ email: email });

    if (!user) {
      const err = new HttpException(422, "User doesn't exist.");
      throw err;
    }
  } catch (err) {
    throw err;
  }

  return user;
};

export const createToken = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    randomBytes(32, async (err, buffer) => {
      let token: string = "";
      if (err) {
        const error = new HttpException(422, "Error while generating token");
        throw error;
      }

      token = buffer.toString("hex");
      resolve(token);
    });
  });
};

export const generateEmail = async (
  user: ExtendedUser,
  tokens: Tokens,
  action: AcceptedEmailsOperations
) => {
  user.tokens = tokens;

  try {
    new EmailBuilder(user).generateEmailTemplate(action).sendEmail();
    await user.save();
  } catch (error: any) {
    error.statusCode = 500;
    throw error;
  }
};

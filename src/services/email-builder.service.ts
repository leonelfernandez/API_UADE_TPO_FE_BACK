import { BaseUser, ExtendedUser } from "../models/user/user.interface";
import { EmailTemplatesModule } from "./email-templates";
import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
import { IEmail, AcceptedEmailsOperations } from "./email-builder";

dotenv.config();

const MAILTRAP_TRANSPORT = createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export class EmailBuilder implements IEmail {
  private user: BaseUser;
  private token: string;
  private emailTemplate: string = "";

  constructor(user: BaseUser) {
    this.user = user;
    this.token = <string>user.tokens.confirmationToken || <string>user.tokens.resetPasswordToken;
  }

  generateEmailTemplate<T extends AcceptedEmailsOperations>(emailTypes: T): EmailBuilder {
    let emailTemplate: string = "";
    switch (emailTypes) {
      case "ActivateAccount":
        emailTemplate = EmailTemplatesModule.getActivateAccountTemplate(
          this.user,
          this.token
        );
        break;
        case "ResetPassword":
          emailTemplate = EmailTemplatesModule.getResetPasswordTemplate(
            this.user,
            this.token
          );
          break;
    }

    this.emailTemplate = emailTemplate;

    return this;
  }

  async sendEmail(): Promise<void> {
    try {
      await MAILTRAP_TRANSPORT.sendMail({
        to: this.user.email,
        subject: "¡Bienvenido a NetList!",
        html: this.emailTemplate,
      });
    } catch (error: any) {
      error.statusCode = 500;
      throw error;
    }
  }
}

type AcceptedEmailsOperations = "ResetPassword" | "ActivateAccount";


interface EmailProperties {
  readonly emailType: AcceptedEmailsOperations;
}

export interface IEmail {
  sendEmail(email: string, htmlTemplate: string): void;
}



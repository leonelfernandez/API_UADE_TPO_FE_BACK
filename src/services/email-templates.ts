import { BaseUser } from "../models/user/user.interface";
import mjml2html from "mjml";
import * as dotenv from "dotenv";

dotenv.config();
export module EmailTemplatesModule {
  export function getActivateAccountTemplate(
    user: BaseUser,
    token: string
  ): string {
    return mjml2html(` <mjml>
<mj-body background-color="#ffffff" font-size="13px">
  <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
    <mj-column vertical-align="top" width="100%">
      <mj-image src="https://i.imgur.com/mGhZ2SS.jpg" alt="" align="center" border="none" width="600px" height="350px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0"></mj-image>
    </mj-column>
  </mj-section>
  <mj-section background-color="hsl(246, 80%, 60%)" padding-bottom="0px" padding-top="0">
    <mj-column vertical-align="top" width="100%">
      <mj-text align="left" color="#ffffff" font-size="45px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Welcome aboard</mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="hsl(235, 46%, 20%)" padding-bottom="20px" padding-top="20px">
    <mj-column vertical-align="middle" width="100%">
      <mj-text align="left" color="#ffffff" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span style="color:hsl(236, 100%, 87%)">Dear ${user.email}</span><br /><br /> Welcome to DashSmart.</mj-text>
      <mj-text align="left" color="#ffffff" font-size="15px" line-height=2 font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">We&apos;re really excited you&apos;ve decided to give us a try. In case you have any questions, feel free to reach out to us at ${process.env.MAIL_USERNAME}. In order to proceed, we need you to activate your account. Hope to see you soon!</mj-text>
      <mj-button align="left" font-size="22px"background-color="hsl(246, 80%, 60%)" border-radius="10px" color="#fff" font-family="open Sans Helvetica, Arial, sans-serif" href=${process.env.NODE_ENV === 'production' ? `${process.env.PRODUCTION_URL}register/${token}` : `${process.env.DEV_URL}register/${token}`}>Activate Account</mj-button>
      <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" line-height=2>Thanks, <br /> The DashSmart Team</mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>`).html;
  }

  export function getResetPasswordTemplate(
    user: BaseUser,
    token: string
  ): string {
    return mjml2html(`<mjml>
    <mj-body>
      <mj-section>
        <mj-column>
  
          <mj-image width="150px" height="100px" src="https://i.imgur.com/w6dyMrJ.png"></mj-image>
  
          <mj-divider border-color="#00A390"></mj-divider>
  
          <mj-text font-size="20px" color="#00A390" font-family="helvetica">Hey ${user.email},</mj-text>
          <mj-text font-size="20px" color="#00A390" font-family="helvetica" line-height=2>
          Your DashSmart password can be reset by clicking the button below. If you did not request a new password, please ignore this email.
          </mj-text>
                <mj-button align="center" padding-bottom="20px" padding-top="20px" font-size="22px"background-color="#00A390" border-radius="10px" color="#fff" font-family="open Sans Helvetica, Arial, sans-serif" href=${process.env.NODE_ENV === 'production' ? `${process.env.PRODUCTION_URL}reset/${token}` : `${process.env.DEV_URL}reset/${token}`}>Reset Password</mj-button>
  
                  <mj-text font-size="20px" color="#00A390" font-family="helvetica">The DashSmart Team</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`).html;
  }
}

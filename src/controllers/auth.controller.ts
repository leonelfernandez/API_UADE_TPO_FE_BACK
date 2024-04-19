import { NextFunction, Request, Response, Errback } from "express";
import HttpException from "../common/http-exception";
import * as AuthService from "../services/auth.services";
import User from "../models/user.model";
import { Tokens } from "../interfaces/user.interface";
import { registerNewUser, loginUser } from "../services/auth.services";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();


const registerController = async (req: Request, res: Response) => { 
  const responseUser = await registerNewUser(req.body);
  res.send(responseUser);


}

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const responseUser = await loginUser({ email, password });
 
  if (responseUser === "INVALID_PASSWORD") {
      res.status(403).send("User not found");
      res.send(responseUser);
  } else {
      res.send(responseUser);
  }
};


// export const confirmAccount = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.params.token;

//   try {
//     let user = await User.findOne({
//       "tokens.confirmationToken": token,
//       "tokens.confirmationTokenExpiration": { $gt: Date.now() },
//     });

//     if (!user) {
//       const err = new HttpException(
//         422,
//         "User doesn't exist or the account has been already confirmed."
//       );
//       throw err;
//     }

//     await User.updateOne(
//       { _id: user._id },
//       {
//         $set: {
//           active: true,
//         },
//         $unset: {
//           "tokens.confirmationToken": 1,
//           "tokens.confirmationTokenExpiration": 1,
//         },
//       }
//     );

//     res.status(201).json({
//       message: "User updated!",
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };

// export const sendResetPasswordEmail = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
    
//   const email: string = req.body.email;

//   try {
//     const user = await AuthService.find(email);

//     const emailData: Tokens = {
//       resetPasswordToken: await AuthService.createToken(),
//       resetPasswordTokenExpiration: Date.now() + 3600000,
//     };

//     await AuthService.generateEmail(user, emailData, "ResetPassword");

//     res.status(201).json({
//       message: "Email sent!",
//     });
//   } catch (err: any) {
//     if (!(err instanceof HttpException)) {
//       err.statusCode = 500;
//     }

//     next(err);
//   }
// };


// export const grantAccessToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
//   const token: string = req.params.token;

//   try {
//     let user = await User.findOne({
//       "tokens.resetPasswordToken": token,
//       "tokens.resetPasswordTokenExpiration": { $gt: Date.now() },
//     });

//     if (!user) {
//       const err = new HttpException(
//         422,
//         "User doesn't exist or the account has been already confirmed."
//       );
//       throw err;
//     }

//     res.status(200).json({email: user.email});


    


//   } catch(err: any) {
//     next(err);
//   }
// }

// export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
//     const email: string = req.body.email;
//     const password: string = req.body.password;
    
//     try {
//       const hashedPw = await hash(password);

//       await User.updateOne({"email": email}, {
//         $set: {
//           "password": hashedPw,
//         },
//         $unset: {
//           "tokens.resetPasswordToken": 1,
//           "tokens.resetPasswordTokenExpiration": 1,
//         },
//       })

//       res.status(200).json({message: "Password changed!"})
//     } catch (err: any) {
//       next(err);
//     }
// }

// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const email: string = req.body.email;
//   const password: string = req.body.password;
//   const JWT_SECRET = process.env.JWT_SECRET as string;
//   const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

//   try {
//     const user = await AuthService.find(email);


//     const verifyUser = await verify(user!.password, password);

//     if (!verifyUser) {
//       const error = new HttpException(
//         422,
//         "Wrong password. Try again or click ‘Forgot your password?’ to reset it."
//       );
//       throw error;
//     }

//     const token = jwt.sign(
//       {
//         email: user.email,
//         userId: user._id.toString()
//       },
//       JWT_SECRET,
//       {
//         expiresIn: JWT_EXPIRATION,
//       }
//     )

//     res.status(200).json({
//       token: token
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };


export { registerController, loginController };

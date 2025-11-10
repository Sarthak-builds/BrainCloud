import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../DB/models/User.js";
import { generateToken } from "../utils/jwt.js";
import { STATUS_CODES } from "../utils/constants.js";
import {success, z} from "zod";
//@ts-ignore
export const signupSchema = z.object({
    body: z.object({
        username:z.string().min(3).max(30),
        password:z.string().min(3,'password too short').max(30),
        email:z.email().includes('@').min(3),
    })
});
export const signinSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(8, 'password too short').max(30),
  }),
});
 export const signup = async (req:Request, res:Response, next:NextFunction) => {
  try {
     const { username, email, password} = req.body;

   const existingUser = await UserModel.findOne({username}).select('+password');
   if(existingUser) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
        message:'User Already Exists',
    });
    return;
   }
   const salt =await bcrypt.genSalt(12);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = await UserModel.create({username:username, password:hashedPassword, email:email});
//@ts-ignore
//    const token = generateToken({username:username, id:user._id.toString()});
    res.status(STATUS_CODES.CREATED).json({
        success:true,
        // token,
        user: { id: user._id,username:username},
    });
} catch (error) {
    next(error);
}
 };

 //signin
 export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).select('+password');
    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
    //@ts-ignore
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
//@ts-ignore
    const userId = user._id.toString();
    const token = generateToken({ username, id: userId });
    res.status(STATUS_CODES.OK).json({
      success: true,
      token,
      user: { id: userId, username },
    });
  } catch (error) {
    console.error('Signin error:', error);
    next(error);
  }
};
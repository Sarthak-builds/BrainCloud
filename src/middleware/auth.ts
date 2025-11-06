import type { NextFunction, Request, Response } from "express";
import { verifyToken, type AuthPayload } from "../utils/jwt.js";
import { STATUS_CODES } from "../utils/constants.js";


export const protect = (req:Request, res:Response, next:NextFunction) => {
     let token:string|undefined;

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
     token= req.headers.authorization.split(' ')[1];
     }

    if (!token) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: 'Not Authorized, no token'
        });
        return;
    }

    const decoded = verifyToken(token);
    if(!decoded) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Not Authorized, invalid token"})
        return;
    }
    //@ts-ignore
    req.user = decoded as AuthPayload;
    next();
}

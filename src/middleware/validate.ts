import type { NextFunction, Request, Response } from "express";
import {z, ZodType} from "zod";
import { STATUS_CODES } from "../utils/constants.js";

export const validate = (schema:ZodType<any>) => {

    return (req:Request, res:Response, next:NextFunction) => {
        try {
            schema.safeParse({
                body:req.body,
                params:req.params,
                query:req.query,
            });
            next();
        } catch(e) {
           res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Validation Error',
            errors: e 
           });
        }
    }
}
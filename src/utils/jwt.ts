//here we will have generatetoken and verify token logic. 
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { error } from "console";

config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export interface AuthPayload {
  username: string;
  id: string;
}

//to generate a token
export const generateToken = (payload:AuthPayload):string => {
if(!JWT_SECRET){
    throw new Error('JWT secret not defined !');
}
const generatedToken = jwt.sign(payload, JWT_SECRET);
return generatedToken;
}
 //verify token
 export const verifyToken = (token:string):AuthPayload | null => {
if(!JWT_SECRET){
    throw new Error('JWT secret not defined !');
}
try {
const decoded = jwt.verify(token, JWT_SECRET);
if( typeof decoded==='object' && decoded !== null && 'id' in decoded && 'username' in decoded) 
    {
return {username:decoded.username, id:decoded.id};
}
console.error('Invalid token payload:', decoded);
    return null;

} catch (err) {
    console.error('Error:',err);
    return null;
}
 }
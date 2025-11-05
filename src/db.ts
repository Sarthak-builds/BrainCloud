import mongoose from "mongoose"; 
import {model, Model, Schema} from "mongoose";
mongoose.connect("");

const UserSchema = new Schema({
    username: { type:String, unique:true, required:true},
    password: String,
})
export const UserModel = model("User", UserSchema);


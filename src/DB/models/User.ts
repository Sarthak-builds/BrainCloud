import mongoose, {model, Schema} from "mongoose";

const UserSchema:Schema = new Schema({
username: {
    type:String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'username must be atleast 3 characters'],
    maxlength: [18, 'Username cannot exceed 18 characters'],
},
email: {
    type: String,
    required: true,
    unique: true,
},
role: {
    type: String,
    enum: ['user', 'admin']
},
password: {
    type: String,
    required: true,
    minlength: [8, 'password must be at least 8 characters'],
}}, {
    timestamps: true,
}
)

export const UserModel = model("User", UserSchema);
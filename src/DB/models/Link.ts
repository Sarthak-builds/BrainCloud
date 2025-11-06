import mongoose, {model, Schema} from "mongoose";

const LinkSchema: Schema = new Schema({
    hash: {
        type:String,
        required:true,
        unique:true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'Users',
        required: true,
    },
}, {timestamps: true,});

export const LinkModel = model('Link', LinkSchema);
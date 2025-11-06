import mongoose, {Schema, model} from "mongoose";

const ContentSchema: Schema = new Schema({
    link: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
         enum: ['bookmark', 'note', 'article', 'video'], 
          required: true,
    },
    title: {
        type: String,
        required: true,
        trim:true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps:true,});

export const ContentModel = model("Content", ContentSchema);
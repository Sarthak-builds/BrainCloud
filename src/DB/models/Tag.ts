import mongoose, { model, Schema } from 'mongoose';

const TagSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
}, {
  timestamps: true,
});



export const TagModel = model("Tag", TagSchema);
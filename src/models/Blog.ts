// models/blog.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../models/User';

export interface IBlog extends Document {
  title: string;
  content: string;
  image: string;
  description: string;
  user: IUser['_id'];
  comments: {
    text: string;
    user: IUser['_id'];
  }[];
  ratings: {
    user: IUser['_id'];
    stars: number;
  }[];
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [
    {
      text: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      stars: { type: Number, required: true },
    },
  ],
});

const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema);

export default BlogModel;

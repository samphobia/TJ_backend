// models/counselling.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICounselling extends Document {
  name: string;
  email: string;
  question: string;
}

const CounsellingSchema = new Schema<ICounselling>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  question: { type: String, required: true },
});

const CounsellingModel = mongoose.model<ICounselling>('Counselling', CounsellingSchema);

export default CounsellingModel;

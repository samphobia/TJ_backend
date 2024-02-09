// models/connect.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IConnect extends Document {
  name: string;
  interest: string;
  CVupload: string; // Assuming CVupload is a string representing the file path
}

const ConnectSchema = new Schema<IConnect>({
  name: { type: String, required: true },
  interest: { type: String, required: true },
  CVupload: { type: String, required: true },
});

const ConnectModel = mongoose.model<IConnect>('Connect', ConnectSchema);

export default ConnectModel;

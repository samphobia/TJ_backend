// models/downloaderInfo.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDownloaderInfo extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

const DownloaderInfoSchema = new Schema<IDownloaderInfo>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  address: { type: String },
});

const DownloaderInfoModel = mongoose.model<IDownloaderInfo>('DownloaderInfo', DownloaderInfoSchema);

export default DownloaderInfoModel;

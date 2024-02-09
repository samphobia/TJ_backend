// models/message.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  content: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;

// models/book.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBooksL extends Document {
  title: string;
  author: string;
  content: Buffer; // Binary data
}

const BooksLSchema = new Schema<IBooksL>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: Buffer, required: true },
});

const BooksLModel = mongoose.model<IBooksL>('BooksL', BooksLSchema);

export default BooksLModel;

// models/book.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IKeyContent {
  image: string;
  title: string;
  text: string;
}

export interface IBook extends Document {
  image: string;
  banner: string;
  catchStatement: string;
  text: string;
  authorsWord: string;
  content1: string;
  image1: string;
  content2: string;
  image2: string;
  link: string;
  bookTitle: string;
  bookKeyContents: IKeyContent[];
}

const KeyContentSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const BookSchema = new Schema<IBook>({
  image: { type: String, required: true },
  banner: { type: String, required: true },
  catchStatement: { type: String, required: true },
  text: { type: String, required: true },
  authorsWord: { type: String, required: true },
  content1: { type: String, required: true },
  image1: { type: String, required: true },
  content2: { type: String, required: true },
  image2: { type: String, required: true },
  link: { type: String, required: true },
  bookTitle: { type: String, required: true },
  bookKeyContents: { type: [KeyContentSchema], required: true },
});

const BookModel = mongoose.model<IBook>('Book', BookSchema);

export default BookModel;

// controllers/bookController.ts
import { Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fs from 'fs';
import BooksLModel, { IBooksL } from '../models/BookLaunch';
import { CustomError } from '../utils/customeError';
import DownloaderInfoModel, { IDownloaderInfo } from '../models/DownloaderInfo';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';

// Upload a new book
export const uploadBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;
    const content = req.file.buffer; // Get book content as binary buffer

    const newBook: IBooksL = new BooksLModel ({
      title,
      author,
      content,
    });

    const createdBook = await BooksLModel.create(newBook);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Download a book by ID
export const downloadBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await BooksLModel.findById(bookId);

    if (!book) {
      throw new CustomError('Book not found', 404);
    }

    // Collect downloader information from request body
    const { firstName, lastName, email } = req.body;

    // Create a new DownloaderInfo document
    const downloaderInfo: IDownloaderInfo = new DownloaderInfoModel({
      firstName,
      lastName,
      email,
    });

    // Save downloader information to DownloaderInfo collection
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createdDownloaderInfo = await DownloaderInfoModel.create(downloaderInfo);

    // Set response headers for file download
    res.setHeader('Content-disposition', `attachment; filename=${book.title}.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    // Send book content as response
    res.send(book.content);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

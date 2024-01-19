// controllers/bookController.ts
import { Request, Response } from 'express';
import BookModel, { IBook } from '../models/Book';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook: IBook = req.body; // Assuming request body contains the book details
    const createdBook = await BookModel.create(newBook);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  try {
    const book = await BookModel.findById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const updatedBookData: IBook = req.body; // Assuming request body contains the updated book details
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, updatedBookData, { new: true });
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

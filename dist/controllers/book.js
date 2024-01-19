"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const createBook = async (req, res) => {
    try {
        const newBook = req.body;
        const createdBook = await Book_1.default.create(newBook);
        res.status(201).json(createdBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res) => {
    try {
        const books = await Book_1.default.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book_1.default.findById(bookId);
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;
    try {
        const updatedBook = await Book_1.default.findByIdAndUpdate(bookId, updatedBookData, { new: true });
        if (updatedBook) {
            res.json(updatedBook);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateBook = updateBook;
//# sourceMappingURL=book.js.map
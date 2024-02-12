"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBook = exports.uploadBook = void 0;
const BookLaunch_1 = __importDefault(require("../models/BookLaunch"));
const customeError_1 = require("../utils/customeError");
const DownloaderInfo_1 = __importDefault(require("../models/DownloaderInfo"));
const errorHandler_1 = require("../middlewares/errorHandler");
// Upload a new book
const uploadBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author } = req.body;
        const content = req.file.buffer; // Get book content as binary buffer
        const newBook = new BookLaunch_1.default({
            title,
            author,
            content,
        });
        const createdBook = yield BookLaunch_1.default.create(newBook);
        res.status(201).json(createdBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.uploadBook = uploadBook;
// Download a book by ID
const downloadBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield BookLaunch_1.default.findById(bookId);
        if (!book) {
            throw new customeError_1.CustomError('Book not found', 404);
        }
        // Collect downloader information from request body
        const { firstName, lastName, email } = req.body;
        // Create a new DownloaderInfo document
        const downloaderInfo = new DownloaderInfo_1.default({
            firstName,
            lastName,
            email,
        });
        // Save downloader information to DownloaderInfo collection
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdDownloaderInfo = yield DownloaderInfo_1.default.create(downloaderInfo);
        // Set response headers for file download
        res.setHeader('Content-disposition', `attachment; filename=${book.title}.pdf`);
        res.setHeader('Content-type', 'application/pdf');
        // Send book content as response
        res.send(book.content);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.downloadBook = downloadBook;
//# sourceMappingURL=bookLaunch.js.map
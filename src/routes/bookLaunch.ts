// routes/bookRoutes.ts
import express from 'express';
import * as bookController from '../controllers/bookLaunch';
import upload from '../middlewares/upload'; // Assuming multer middleware is used for file upload

const router = express.Router();

// Upload a book
router.post('/books', upload.single('book'), bookController.uploadBook);

// Download a book
router.post('/books/:bookId/download', bookController.downloadBook);

export default router;

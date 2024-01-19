// routes/bookRoutes.ts
import express from 'express';
import * as bookController from '../controllers/book';

const router = express.Router();

router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);

export default router;

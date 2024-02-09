import express from 'express';
import * as connectController from '../controllers/connect';
import upload from '../middlewares/muller'; // Import Multer middleware

const router = express.Router();

router.post('/connect', upload.single('cv'), connectController.createConnect); // Handle single file upload

export default router;
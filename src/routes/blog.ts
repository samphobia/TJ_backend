import express from 'express';
import * as authController from '../controllers/blog';
import { authenticateJWT, authenticateUser } from '../middlewares/auth';

const router = express.Router();


router.post('/', authenticateJWT, authController.createBlog);


export default router;
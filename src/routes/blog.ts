import express from 'express';
import * as authController from '../controllers/blog';
import { authenticateJWT } from '../middlewares/auth';

const router = express.Router();


router.post('/', authenticateJWT, authController.createBlog);

router.post('/comment', authenticateJWT, authController.addComment);

router.post('/rating', authenticateJWT, authController.addRating);

router.get('/blogs', authController.getAllBlogs);

router.get('/blogs/:blogId', authController.getBlogById);


export default router;
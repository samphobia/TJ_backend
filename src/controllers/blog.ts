// controllers/blogController.ts
import { Request, Response } from 'express';
import BlogModel, { IBlog } from '../models/Blog';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, image, description } = req.body;
    const userId = req.user?.userId; // Assuming you have user information in req.user

    if (!userId) {
      throw new CustomError('Unauthorized - Missing user ID', 404);
    }

    const newBlog: IBlog = new BlogModel ({
      title,
      content,
      image,
      description,
      user: userId,
      comments: [],
      ratings: [],
    });

    const createdBlog = await BlogModel.create(newBlog);
    res.status(201).json(createdBlog);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

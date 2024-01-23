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


export const addComment = async (req: Request, res: Response) => {
  try {
    const { blogId, text } = req.body;
    const userId = req.user?.userId; 

    if (!userId) {
      throw new CustomError('Unauthorized - Missing user ID', 404);
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      { $push: { comments: { text, user: userId } } },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

export const addRating = async (req: Request, res: Response) => {
  try {
    const { blogId, stars } = req.body;
    const userId = req.user?.userId; // Assuming you have user information in req.user

    if (!userId) {
      throw new CustomError('Unauthorized - Missing user ID', 404);
    }

    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      throw new CustomError('Blog not found', 404);
    }

    // Check if the user has already rated this blog
    const existingRating = blog.ratings.find((rating) => rating.user.toString() === userId);

    if (existingRating) {
      throw new CustomError('User has already rated this blog', 400);
    }

    // Add the new rating
    blog.ratings.push({ user: userId, stars });
    await blog.save();

    // Calculate average rating
    const averageRating = calculateAverageRating(blog.ratings);

    res.status(200).json({ success: true, message: 'Rating added successfully', averageRating });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Function to calculate average rating
const calculateAverageRating = (ratings: { user: string; stars: number }[]) => {
  if (ratings.length === 0) {
    return 0;
  }

  const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
  const averageRating = totalStars / ratings.length;

  return averageRating;
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;

    if (!blogId) {
      throw new CustomError('Blog ID is required', 400);
    }

    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      throw new CustomError('Blog not found', 404);
    }

    res.status(200).json(blog);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};
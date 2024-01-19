// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';

const saltRounds = 10;
const jwtSecret = 'your-secret-key'; // Replace with your secret key

// User registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body as {
      name: string;
      email: string;
      password: string;
      role: 'admin' | 'superadmin' | 'user';
    };

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        message: 'User with this email already exists',
      });
      return;
    }

    // Ensure types are correctly inferred
    const newUser: IUser = new UserModel({
      name,
      email,
      password,
      role,
    });
    // Hash the password
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;

    // Create user in the database
    const createdUser = await UserModel.create(newUser);

    // Generate JWT token
    const token = jwt.sign({ userId: createdUser._id, role: createdUser.role }, jwtSecret, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(201).json({ token, user: createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new CustomError('No User found', 401);
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError('you entered wrong password', 401);
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token, user });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
  
};

export const getLoggedUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string | undefined = req.headers['user-id'] as string;
    const userRole: string | undefined = req.headers['user-role'] as string;

    // Validate that userId and userRole are present
    if (!userId || !userRole) {
      res.status(401).json({ message: 'Unauthorized: User ID or Role not provided in headers' });
      return;
    }

    // Assuming you have a middleware that verifies user roles, you can add additional checks here

    // Fetch the user from the database based on userId
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
// function next(error: any) {
//   throw new Error('Function not implemented.');
// }


// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';
import { validateEmail, validatePassword } from '../middlewares/validator';
import { invalidateToken } from "../middlewares/auth";

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

    if (!validateEmail(email)) {
      throw new CustomError('Enter a valid email', 404);
    }

    if (!validatePassword(password)) {
      throw new CustomError('password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character', 404);
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new CustomError('User with this email already exist', 409);
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
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!validateEmail(email)) {
      throw new CustomError('Enter a valid email', 404);
    }

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new CustomError('No User found', 404);
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
    errorHandlerMiddleware(error, req, res, () => { });
  }

};

export const getLoggedUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string | undefined = req.headers['user-id'] as string;
    const userRole: string | undefined = req.headers['user-role'] as string;

    // Validate that userId and userRole are present
    if (!userId || !userRole) {
      throw new CustomError('Unauthorized: User ID or Role not provided in headers', 401);
    }

    // Assuming you have a middleware that verifies user roles, you can add additional checks here

    // Fetch the user from the database based on userId
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new CustomError('No User found', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    const userToken: string | undefined = req.headers['authorization']?.split(' ')[1];
    if (userToken) {
      invalidateToken(userToken);
    }

    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


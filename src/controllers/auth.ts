// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User';

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
      res.status(401).json({
        message: 'Invalid credentials',
      });
      return;
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Invalid credentials',
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'login failed' });
  }
};


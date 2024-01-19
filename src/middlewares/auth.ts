import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export interface AuthenticatedUserData extends Request {
  userId: string;
  userRole: string;
}

declare global{
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUserData;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized: Token not provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; userRole: string };

    // Attach userId and role to the request object for further use in controllers
    req.user = { userId: decoded.userId, userRole: decoded.userRole } as AuthenticatedUserData; 

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export const authenticateUser = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Extract userId and role from the authentication headers
      const userId: string | undefined = req.headers['user-id'] as string;
      const userRole: string | undefined = req.headers['user-role'] as string;

      // Validate that userId and role are present
      if (!userId || !userRole) {
        res.status(401).json({ message: 'Unauthorized: User ID or Role not provided in headers' });
        return;
      }

      // Check if the user has an allowed role
      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        return;
      }

      // Attach userId and role to the request object for further use in controllers
      req.user = { userId, userRole } as AuthenticatedUserData; 

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

export const generateJWTToken = (user: IUser): string => {
  const secret: string = (process.env.JWT_SECRET as string);
  return jwt.sign({ sub: user._id, username: user.name, role: user.role }, secret, {
    expiresIn: '1h', // Token expiration time (adjust as needed)
  });
};

const invalidatedTokens: Set<string> = new Set();

// Function to invalidate a user's token
export const invalidateToken = (token: string): void => {
  // Add the token to the set of invalidated tokens
  invalidatedTokens.add(token);
};


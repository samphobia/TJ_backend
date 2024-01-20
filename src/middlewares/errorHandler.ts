import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customeError';

export const errorHandlerMiddleware = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    console.error(`Custom Error: ${err.message}, Status: ${err.status}`);

    // Respond to the client with the error details
    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  } else {
    // Handle other types of errors
    console.error(`Unexpected Error: ${err.message}`);

    // Respond to the client with a generic error message
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
    });
  }
};


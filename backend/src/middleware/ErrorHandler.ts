import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import logger from '../utils/Logger.util';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';
  const errorStack = err.stack || '';

  // Log the error details
  logger.error({
    message: `${statusCode} - ${errorMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    stack: errorStack,
    file: __filename, // The file where the error occurred
    line: getLineNumber(errorStack) // Extract the line number from the stack trace
  });

  //! errorMessage = err.status == 500 ? 'Internal Server Error' : err.message;

  // Respond to the client
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: errorMessage
    }
  });
};

// Helper function to extract the line number from the stack trace
const getLineNumber = (stack: string): string | null => {
  const stackLines = stack.split('\n');
  if (stackLines.length > 1) {
    const lineMatch = stackLines[1].match(/(\d+):\d+/);
    if (lineMatch && lineMatch.length > 1) {
      return lineMatch[1];
    }
  }
  return null;
};

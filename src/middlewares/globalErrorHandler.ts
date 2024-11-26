// middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: HttpError | Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging
  console.error(err);

  // Set default status code if the error doesn't have one
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof HttpError ? err.message : "Internal Server Error";

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;

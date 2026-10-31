import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { StatusCode } from "../constants/statusCode";
import { Logger } from "../utils/logger";
import { ResponseHelper } from "../utils/ResponseHelper";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  Logger.error("Error encountered:", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method
  });

  if (err instanceof AppError) {
    ResponseHelper.error(res, err.statusCode, err.message);
    return;
  }

  // Fallback for unhandled unexpected exceptions
  ResponseHelper.error(
    res,
    StatusCode.INTERNAL_SERVER_ERROR,
    "An unexpected internal server error occurred"
  );
};


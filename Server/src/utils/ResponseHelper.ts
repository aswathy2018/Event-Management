import { Response } from "express";
import { StatusCode } from "../constants/statusCode";

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export class ResponseHelper {
  static success<T>(
    res: Response,
    statusCode: StatusCode = StatusCode.OK,
    message: string,
    data?: T
  ): void {
    const responsePayload: IApiResponse<T> = {
      success: true,
      message,
      ...(data !== undefined ? { data } : {})
    };
    res.status(statusCode).json(responsePayload);
  }

  static error(
    res: Response,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR,
    message: string,
    error?: unknown
  ): void {
    const responsePayload: IApiResponse = {
      success: false,
      message,
      ...(error !== undefined ? { error } : {})
    };
    res.status(statusCode).json(responsePayload);
  }
}


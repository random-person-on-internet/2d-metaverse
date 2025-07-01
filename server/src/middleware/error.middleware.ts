import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(`Unexpected Error: ${err}`);
  res.status(500).json({ message: "Internal Server Error" });
  return;
};

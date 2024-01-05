import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.statusCode ?? err.status ?? 500).json({
    message: err.message,
  });
};

export default errorHandler;

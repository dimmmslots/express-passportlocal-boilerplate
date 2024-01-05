import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const authenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) return next();
  return next(
    createHttpError(401, "You are unauthenticated to access this resource.")
  );
};

export default authenticatedMiddleware;

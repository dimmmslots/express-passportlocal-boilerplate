import { NextFunction, Request, Response } from "express";
import { TUserRegister } from "../@types/user.type";
import authService from "../services/auth.service";
import createHttpError from "http-errors";

const csrfToken = (req: Request, res: Response) => {
  return res.json({ data: req.csrfToken() });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as TUserRegister;
    const user = await authService.register(payload);
    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(
      createHttpError(401, "You are unauthorized to access this resource.")
    );
  }
  const user = req.user;
  return res.json({ data: user });
};

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user)
      return next(
        createHttpError(401, "You are not authorized to access this resource.")
      );
    return res.status(200).json({
      data: user,
    });
  } catch (error: any) {
    next(createHttpError(500, error.message));
  }
};

export default { csrfToken, register, login, authenticated };

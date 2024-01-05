import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import createHttpError from "http-errors";

const ZodValidator =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      const issue = (error as ZodError).issues[0];
      return next(createHttpError(400, `${issue.path} ${issue.message}`));
    }
  };

export default ZodValidator;

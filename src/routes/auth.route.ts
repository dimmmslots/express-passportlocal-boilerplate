import { Router } from "express";
import csrfProtection from "../configs/csrf";
import authController from "../controllers/auth.controller";
import ZodValidator from "../middlewares/zod.middleware";
import { userLoginSchema, userRegisterSchema } from "../@types/user.type";
import passport from "passport";
import authenticatedMiddleware from "../middlewares/authenticated.middleware";

const router = Router();

router.get("/csrf", csrfProtection, authController.csrfToken);

router.post(
  "/register",
  csrfProtection,
  ZodValidator(userRegisterSchema),
  authController.register
);

router.post(
  "/login",
  csrfProtection,
  ZodValidator(userLoginSchema),
  passport.authenticate("local", {
    failWithError: true,
  }),
  authController.login
);

router.get("/protected", authenticatedMiddleware, authController.authenticated);

export default router;

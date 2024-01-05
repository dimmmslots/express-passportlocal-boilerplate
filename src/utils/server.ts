import express from "express";
import session from "express-session";
import "dotenv/config";
import passport from "passport";
import redisStore from "./redis_conn";
import cors from "cors";
import { Strategy as LocalStrategy } from "passport-local";
import authService from "../services/auth.service";
import errorHandler from "../middlewares/error.middleware";
import { TUser } from "../@types/user.type";
import helmet from "helmet";
import "dotenv/config";

function createServer() {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET!,
      resave: false,
      cookie: {
        maxAge: 604800,
        sameSite: "lax",
        secure: process.env.NODE_ENV == "dev" ? false : true,
      },
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    "local",
    new LocalStrategy({ usernameField: "email" }, (email, password, cb) => {
      authService.login(email, password).then((user) => {
        if (user) return cb(null, user);
        return cb(
          { message: "Incorrect email or password", statusCode: 401 },
          false
        );
      });
    })
  );
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: TUser, cb) {
    cb(null, obj);
  });

  app.use(errorHandler);
  return app;
}

export default createServer;

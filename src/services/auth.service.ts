import { User } from "@prisma/client";
import createHttpError from "http-errors";
import { TUser } from "../@types/user.type";
import db from "../utils/db_conn";
import bcryptService from "../services/bcrypt.service";

const login = async (
  email: string,
  password: string
): Promise<TUser | null> => {
  const user = await db.user.findFirst({ where: { email } });
  if (!user) return null;
  const passwordMatches = bcryptService.comparePass(password, user.password);
  if (!passwordMatches) return null;
  return {
    name: user.name,
    email: user.email,
    picture: "",
  };
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<TUser | null> => {
  try {
    const userExist = await findUserByEmail(payload.email);
    if (userExist) throw createHttpError(409, "Email has already been taken.");
    const hashed = bcryptService.encryptPass(payload.password);

    const user = await db.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashed,
      },
    });

    const { id, password, createdAt, updatedAt, ...result } = user;

    return result;
  } catch (error: any) {
    throw createHttpError(error.statusCode ?? 500, error.message);
  }
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findFirst({ where: { email } });
  if (user) return user;
  return null;
};

export default { login, register, findUserByEmail };

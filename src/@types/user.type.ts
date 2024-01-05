import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  picture: z.string().nullable(),
});

export const userRegisterSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
});

export const userLoginSchema = userRegisterSchema.pick({
  email: true,
  password: true,
});

export type TUser = z.infer<typeof schema>;
export type TUserRegister = z.infer<typeof userRegisterSchema>;
export type TUserLogin = z.infer<typeof userLoginSchema>;

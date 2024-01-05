import { TUser } from "../user.type";

export {};

declare global {
  namespace Express {
    export interface User extends TUser {}
  }
}

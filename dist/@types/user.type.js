"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegisterSchema = exports.schema = void 0;
const zod_1 = require("zod");
exports.schema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    picture: zod_1.z.string().nullable(),
});
exports.userRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(5),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
});
exports.userLoginSchema = exports.userRegisterSchema.pick({
    email: true,
    password: true,
});
//# sourceMappingURL=user.type.js.map
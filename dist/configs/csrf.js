"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csurf_1 = __importDefault(require("csurf"));
const csrfProtection = (0, csurf_1.default)({
    cookie: {
        maxAge: 604800,
        secure: true,
        sameSite: "lax",
        httpOnly: true,
    },
});
exports.default = csrfProtection;
//# sourceMappingURL=csrf.js.map
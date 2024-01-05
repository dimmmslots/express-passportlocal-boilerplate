"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const db_conn_1 = __importDefault(require("../utils/db_conn"));
const bcrypt_service_1 = __importDefault(require("../services/bcrypt.service"));
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_conn_1.default.user.findFirst({ where: { email } });
    if (!user)
        return null;
    const passwordMatches = bcrypt_service_1.default.comparePass(password, user.password);
    if (!passwordMatches)
        return null;
    return {
        name: user.name,
        email: user.email,
        picture: "",
    };
});
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userExist = yield findUserByEmail(payload.email);
        if (userExist)
            throw (0, http_errors_1.default)(409, "Email has already been taken.");
        const hashed = bcrypt_service_1.default.encryptPass(payload.password);
        const user = yield db_conn_1.default.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashed,
            },
        });
        const { id, password, createdAt, updatedAt } = user, result = __rest(user, ["id", "password", "createdAt", "updatedAt"]);
        return result;
    }
    catch (error) {
        throw (0, http_errors_1.default)((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500, error.message);
    }
});
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_conn_1.default.user.findFirst({ where: { email } });
    if (user)
        return user;
    return null;
});
exports.default = { login, register, findUserByEmail };
//# sourceMappingURL=auth.service.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const http_errors_1 = __importDefault(require("http-errors"));
const csrfToken = (req, res) => {
    return res.json({ data: req.csrfToken() });
};
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = yield auth_service_1.default.register(payload);
        return res.status(201).json({
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => {
    if (!req.user) {
        return next((0, http_errors_1.default)(401, "You are unauthorized to access this resource."));
    }
    const user = req.user;
    return res.json({ data: user });
};
const authenticated = (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            return next((0, http_errors_1.default)(401, "You are not authorized to access this resource."));
        return res.status(200).json({
            data: user,
        });
    }
    catch (error) {
        next((0, http_errors_1.default)(500, error.message));
    }
};
exports.default = { csrfToken, register, login, authenticated };
//# sourceMappingURL=auth.controller.js.map
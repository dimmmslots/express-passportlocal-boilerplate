"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const authenticatedMiddleware = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    return next((0, http_errors_1.default)(401, "You are unauthenticated to access this resource."));
};
exports.default = authenticatedMiddleware;
//# sourceMappingURL=authenticated.middleware.js.map
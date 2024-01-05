"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    var _a, _b;
    return res.status((_b = (_a = err.statusCode) !== null && _a !== void 0 ? _a : err.status) !== null && _b !== void 0 ? _b : 500).json({
        message: err.message,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error.middleware.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const csrf_1 = __importDefault(require("../configs/csrf"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const zod_middleware_1 = __importDefault(require("../middlewares/zod.middleware"));
const user_type_1 = require("../@types/user.type");
const passport_1 = __importDefault(require("passport"));
const authenticated_middleware_1 = __importDefault(require("../middlewares/authenticated.middleware"));
const router = (0, express_1.Router)();
router.get("/csrf", csrf_1.default, auth_controller_1.default.csrfToken);
router.post("/register", csrf_1.default, (0, zod_middleware_1.default)(user_type_1.userRegisterSchema), auth_controller_1.default.register);
router.post("/login", csrf_1.default, (0, zod_middleware_1.default)(user_type_1.userLoginSchema), passport_1.default.authenticate("local", {
    failWithError: true,
}), auth_controller_1.default.login);
router.get("/protected", authenticated_middleware_1.default, auth_controller_1.default.authenticated);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
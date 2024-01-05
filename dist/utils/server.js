"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
require("dotenv/config");
const passport_1 = __importDefault(require("passport"));
const redis_conn_1 = __importDefault(require("./redis_conn"));
const cors_1 = __importDefault(require("cors"));
const passport_local_1 = require("passport-local");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const csurf_1 = __importDefault(require("csurf"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, express_session_1.default)({
        store: redis_conn_1.default,
        secret: process.env.SESSION_SECRET,
        proxy: true,
        resave: false,
        cookie: {
            maxAge: 604800,
            sameSite: "lax",
            secure: process.env.NODE_ENV == "dev" ? false : true,
        },
        saveUninitialized: false,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use((0, csurf_1.default)({ cookie: true }));
    passport_1.default.use("local", new passport_local_1.Strategy({ usernameField: "email" }, (email, password, cb) => {
        auth_service_1.default.login(email, password).then((user) => {
            if (user)
                return cb(null, user);
            return cb({ message: "Incorrect email or password", statusCode: 401 }, false);
        });
    }));
    passport_1.default.serializeUser(function (user, cb) {
        cb(null, user);
    });
    passport_1.default.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
    app.use("/api/auth", auth_route_1.default);
    app.use(error_middleware_1.default);
    return app;
}
exports.default = createServer;
//# sourceMappingURL=server.js.map
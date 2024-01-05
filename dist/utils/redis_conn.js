"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default(process.env.REDIS_URL);
const redisStore = new connect_redis_1.default({ client: redisClient });
exports.default = redisStore;
//# sourceMappingURL=redis_conn.js.map
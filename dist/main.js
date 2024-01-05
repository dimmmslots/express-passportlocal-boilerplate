"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = __importDefault(require("./utils/server")); // we haven't made this just yet
const app = (0, server_1.default)();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on localhost:${process.env.PORT}`);
});
//# sourceMappingURL=main.js.map
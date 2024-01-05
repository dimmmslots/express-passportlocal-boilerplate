"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
function encryptPass(plaintext) {
    return bcrypt_1.default.hashSync(plaintext, 10);
}
function comparePass(plaintext, ciphertext) {
    return bcrypt_1.default.compareSync(plaintext, ciphertext);
}
exports.default = { encryptPass, comparePass };
//# sourceMappingURL=bcrypt.service.js.map
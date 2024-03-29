"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let environment = typeof process.env.NODE_ENV != "undefined" ? process.env.NODE_ENV : "development";
let envPath = `./config/.env.${environment}`;
dotenv_1.default.config({ path: envPath });

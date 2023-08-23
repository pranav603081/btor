"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnction = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
require("../../config/config");
let DatabaseConnction = exports.DatabaseConnction = class DatabaseConnction {
    constructor() {
        this.connect();
    }
    connect() {
        return new Promise((resolve, reject) => {
            try {
                let options = { useNewUrlParser: true, useUnifiedTopology: true };
                let mongoDBUrl = process.env.MONGO_DB_URL ? String(process.env.MONGO_DB_URL) : "";
                mongoose_1.default.connect(mongoDBUrl, options);
                mongoose_1.default.connection.on('error', (err) => {
                    console.log(`DB error ${err}`);
                });
                mongoose_1.default.connection.on('disconnected', (err) => {
                    console.log(`DB disconnected error ${err}`);
                });
                resolve(true);
            }
            catch (error) {
                reject(false);
            }
        });
    }
};
exports.DatabaseConnction = DatabaseConnction = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseConnction);

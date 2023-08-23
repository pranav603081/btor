"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ServerConnection = void 0;
require("reflect-metadata");
const hapi_1 = require("@hapi/hapi");
const inversify_1 = require("inversify");
require("../../config/config");
const ContainerConfig_1 = __importDefault(require("./ContainerConfig"));
const fs = __importStar(require("fs"));
const fsPromise = require('fs').promises;
const path = __importStar(require("path"));
let ServerConnection = exports.ServerConnection = class ServerConnection {
    constructor() {
        this.connect();
    }
    connect() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let port = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3001;
                let host = process.env.SERVER_HOST ? String(process.env.SERVER_HOST) : "localhost";
                const server = new hapi_1.Server({
                    port: port,
                    host: host
                });
                yield this.LoadModule(server, ContainerConfig_1.default);
                server.start();
                console.log('Server running on %s', server.info.uri);
                resolve(true);
            }
            catch (error) {
                console.log("server error" + error);
                reject(false);
            }
        }));
    }
    LoadModule(server, container) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const componentsDir = path.join(__dirname, "../components");
            const componentDirs = fs.readdirSync(componentsDir);
            for (const componentDir of componentDirs) {
                // Register routes for each module dynamically
                const modulesDir = path.join(componentsDir, componentDir);
                const moduleDirs = fs.readdirSync(modulesDir);
                outerLoop: for (const moduleDir of moduleDirs) {
                    const check = yield this.isFile(path.join(modulesDir, moduleDir));
                    if (check)
                        continue outerLoop;
                    let controllerConfig = require(`${path.join(modulesDir, moduleDir)}/${moduleDir}.types`);
                    console.log("controllerClass", controllerConfig.featureName);
                    const routesPath = path.join(modulesDir, moduleDir, 'routes');
                    const routesFiles = fs.readdirSync(routesPath);
                    for (const routesFile of routesFiles) {
                        const registerRoutes = require(path.join(routesPath, routesFile)).registerRoutes;
                        const controllerName = routesFile.split('Routes.')[0];
                        const controller = container.get(controllerName + 'Controller');
                        registerRoutes(server, controller);
                    }
                }
            }
            resolve(true);
        }));
    }
    isFile(path) {
        return new Promise((resove, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield fsPromise.stat(path);
                resove(stats.isFile());
            }
            catch (err) {
                console.error(err);
                resove(false);
            }
        }));
    }
};
exports.ServerConnection = ServerConnection = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ServerConnection);

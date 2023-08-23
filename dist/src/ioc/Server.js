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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const hapi_1 = require("@hapi/hapi");
const fs = __importStar(require("fs"));
const fsPromise = require('fs').promises;
const path = __importStar(require("path"));
require("./root.ioc");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const container = new inversify_1.Container();
container.load((0, inversify_binding_decorators_1.buildProviderModule)());
// Create a new Hapi server instance
const server = new hapi_1.Server({
    port: 3005,
    host: 'localhost',
});
function isFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stats = yield fsPromise.stat(path);
            return stats.isFile();
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const componentsDir = path.join(__dirname, "../components");
    const componentDirs = fs.readdirSync(componentsDir);
    for (const componentDir of componentDirs) {
        // Register routes for each module dynamically
        const modulesDir = path.join(componentsDir, componentDir);
        const moduleDirs = fs.readdirSync(modulesDir);
        outerLoop: for (const moduleDir of moduleDirs) {
            const check = yield isFile(path.join(modulesDir, moduleDir));
            if (check)
                continue outerLoop;
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
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
init();

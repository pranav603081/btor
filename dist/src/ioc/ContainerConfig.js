"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./root.ioc");
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const container = new inversify_1.Container();
container.load((0, inversify_binding_decorators_1.buildProviderModule)());
exports.default = container;

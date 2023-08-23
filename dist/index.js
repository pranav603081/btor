"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./src/ioc/ContainerConfig");
const ServerConnection_1 = require("./src/ioc/ServerConnection");
const DatabaseConnection_1 = require("./src/ioc/DatabaseConnection");
const inversify_1 = require("inversify");
const kernel = new inversify_1.Container();
kernel.resolve(DatabaseConnection_1.DatabaseConnction);
kernel.resolve(ServerConnection_1.ServerConnection);
process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
    process.exit(1);
});

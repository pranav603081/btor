import "reflect-metadata";
import "./src/ioc/ContainerConfig";
import { ServerConnection } from "./src/ioc/ServerConnection";
import { DatabaseConnction } from "./src/ioc/DatabaseConnection";
import { Container } from "inversify";

const kernel = new Container();
kernel.resolve(DatabaseConnction);
kernel.resolve(ServerConnection);

process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
    process.exit(1);
});

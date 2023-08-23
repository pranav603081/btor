import "reflect-metadata";
import { Server } from "@hapi/hapi";
import { Container, injectable } from "inversify";
import "../../config/config";
import { IServerConnection } from "./interfaces/server.interface";
import container from "./ContainerConfig";
import * as fs from 'fs';
const fsPromise = require('fs').promises;
import * as path from 'path';

@injectable()
export class ServerConnection implements IServerConnection{
    constructor(){
        this.connect();
    }

    public connect():Promise<boolean> {
        return new Promise(async(resolve, reject)=>{
            try {
                
                let port:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3001;
                let host:string = process.env.SERVER_HOST ? String(process.env.SERVER_HOST) : "localhost";
    
                const server: Server = new Server({
                    port:port,
                    host: host
                });   

                await this.LoadModule(server, container);
    
                server.start();
                console.log('Server running on %s', server.info.uri);

                resolve(true);
            } catch (error) {
                console.log("server error"+ error);
                reject(false);
            }
        });
        
    }

    public LoadModule (server: Server, container: Container):Promise<any> {
        
        return new Promise(async(resolve, reject)=>{
            const componentsDir = path.join(__dirname, "../components");
            const componentDirs = fs.readdirSync(componentsDir);

            for (const componentDir of componentDirs) {

                // Register routes for each module dynamically
                const modulesDir = path.join(componentsDir, componentDir);
                const moduleDirs = fs.readdirSync(modulesDir);

                outerLoop:for (const moduleDir of moduleDirs) {
                    
                    const check = await this.isFile(path.join(modulesDir,moduleDir));
                    if(check)
                        continue outerLoop;

                    let controllerConfig = require(`${path.join(modulesDir, moduleDir)}/${moduleDir}.types`);
                    // console.log("controllerClass", controllerConfig.featureName);   

                    const routesPath = path.join(modulesDir, moduleDir, 'routes');
                    const routesFiles = fs.readdirSync(routesPath);

                    for (const routesFile of routesFiles) {
                        const registerRoutes = require(path.join(routesPath, routesFile)).registerRoutes;
                        // const controllerName = routesFile.split('Routes.')[0];

                        const controller = container.get<any>(`${controllerConfig.featureName}Controller`);
                        registerRoutes(server, controller);
                    }
                }
            }
            resolve(true);
        })
    }

    public isFile(path:string):Promise<any> {
        return new Promise(async(resove, reject)=>{
            try {
                const stats = await fsPromise.stat(path);
                resove(stats.isFile());
              } catch (err) {
                console.error(err);
                resove(false);
              }
        })
    }
}

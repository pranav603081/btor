import dotenv from "dotenv";

let environment:string = typeof process.env.NODE_ENV != "undefined" ? process.env.NODE_ENV: "development";
let envPath:string = `./config/.env.${environment}`;

dotenv.config({ path: envPath });
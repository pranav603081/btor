import { Request, ResponseToolkit } from "@hapi/hapi";

export interface IProductController {
    getAllProducts(request: Request, h:ResponseToolkit): Promise<any>;
}
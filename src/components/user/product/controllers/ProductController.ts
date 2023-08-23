import { IProductController} from "./interfaces/IProductController";
import { IProductService } from '../services/interfaces/IProductService';
import { inject } from 'inversify';
import { Request, ResponseToolkit } from "@hapi/hapi";
import { provide } from "inversify-binding-decorators";

@provide("ProductController")
export class ProductController implements IProductController{
    constructor(@inject('ProductService') private productService: IProductService) {}

    async getAllProducts(request: Request, h: ResponseToolkit): Promise<any> {
        try {
            const products = await this.productService.getAllProducts();
            return h.response(products);
        } catch (error:any) {
            return h.response(error).code(500);
        }
    }
}
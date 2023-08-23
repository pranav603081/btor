import { provide } from "inversify-binding-decorators";
import { IProductService } from "./interfaces/IProductService";
import { injectable } from "inversify";

@provide("ProductService")
export class ProductService implements IProductService {
    async getAllProducts(): Promise<any> {
        try {
            //our bussiness logic
            return new Promise((resolve, reject)=>resolve("data extracted"));
        } catch (error) {
            throw new Error("error fetching products")
        }
    }
}
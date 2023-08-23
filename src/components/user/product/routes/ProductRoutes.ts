import { Server } from '@hapi/hapi';
import { ProductController } from '../controllers/ProductController';

export function registerRoutes(server: Server, controller: ProductController) {
    server.route({
        method: 'GET',
        path: '/products',
        handler: async(request, h) => {
            console.log("came 1");
            return await controller.getAllProducts(request, h);
        }
    });
}
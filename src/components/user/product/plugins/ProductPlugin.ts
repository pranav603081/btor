import { Server, Plugin } from '@hapi/hapi';
import { Container } from 'inversify';
import { ProductController } from '../controllers/ProductController';
import container from '../../../../ioc/ContainerConfig';

export const productPlugin: Plugin<void> = {
    name: 'productPlugin',
    version: '1.0.0',
    register: async (server: Server, options: any) => {
        const productController = container.get<ProductController>(ProductController);
        const productRoutes = require('../routes/ProductRoutes');
        productRoutes.registerRoutes(server, productController);
    },
};
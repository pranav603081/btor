"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPlugin = void 0;
const ProductController_1 = require("../controllers/ProductController");
const ContainerConfig_1 = __importDefault(require("../../../../ioc/ContainerConfig"));
exports.productPlugin = {
    name: 'productPlugin',
    version: '1.0.0',
    register: (server, options) => __awaiter(void 0, void 0, void 0, function* () {
        const productController = ContainerConfig_1.default.get(ProductController_1.ProductController);
        const productRoutes = require('../routes/ProductRoutes');
        productRoutes.registerRoutes(server, productController);
    }),
};

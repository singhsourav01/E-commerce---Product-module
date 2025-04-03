import express from "express";
import ProductController from "../controllers/product.controller";
import {API_ENDPOINTS} from "../constants/app.constants"

const ProductRouter = express.Router();
const productController = new ProductController();

ProductRouter.route(API_ENDPOINTS.CREATE_PRODUCT).post(
    productController.createProduct
)
ProductRouter.route(API_ENDPOINTS.GET_PRODUCTS).get(
    productController.getAllProducts
)
ProductRouter.route(API_ENDPOINTS.PRODUCT).get(
    productController.getProductById
)
ProductRouter.route(API_ENDPOINTS.PRODUCT).put(
    productController.updateProduct
)
ProductRouter.route(API_ENDPOINTS.PRODUCT).delete(
    productController.deleteProduct
)

export default ProductRouter;

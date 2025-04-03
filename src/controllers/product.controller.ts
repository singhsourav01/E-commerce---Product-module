import { Request, Response } from "express";
import ProductService from "../services/product.service";import {
    ApiResponse, asyncHandler
  } from "common-microservices-utils";
  import { StatusCodes } from "http-status-codes";
import { API_RESPONSES } from "../constants/app.constants";

class ProductController {

    productService: ProductService;

    constructor() {
      this.productService = new ProductService();
    }
    createProduct = asyncHandler(async (req: Request, res: Response) => {
        const { sku, name, price, images } = req.body;
        const response = await this.productService.createProduct(sku, name, price, images);
        return res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, response, API_RESPONSES.PRODUCT_CREATED));
    })

     getProductById = asyncHandler(async (req: Request, res: Response) =>{
        const product = await this.productService.getProductById(req.params.id);
        return res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, product, API_RESPONSES.PRODUCT_FETCHED));
    })

     getAllProducts = asyncHandler(async (req: Request, res: Response) =>{
        const products = await this.productService.getAllProducts();    
        console.log(" here")
        return res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, products, API_RESPONSES.PRODUCTS_FETCHED));   
    })

     updateProduct = asyncHandler(async (req: Request, res: Response) =>{
        const { sku, name, price, images } = req.body;
        const response = await this.productService.updateProduct(req.params.id, sku, name, price, images);
        return res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, response, API_RESPONSES.PRODUCT_UPDATED));
    })

     deleteProduct = asyncHandler(async (req: Request, res: Response) =>{
        const response = await this.productService.deleteProduct(req.params.id);
        return res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, response, API_RESPONSES.PRODUCT_DELETED));
    })
}

export default ProductController;

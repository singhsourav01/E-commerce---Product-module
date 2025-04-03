import { API_ERRORS } from "../constants/app.constants";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { ProductImage } from "../entities/productImage.entity";
import {
    ApiError
  } from "common-microservices-utils";
  import { StatusCodes } from "http-status-codes";

const productRepository = AppDataSource.getRepository(Product);

class ProductService {
    
    createProduct = async (sku: string, name: string, price: number, images: string[]) => {
        if (!sku || !name || price === undefined || !Array.isArray(images)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.INVALID_DATA)
        }

        const product = new Product();
        product.prodcut_sku = sku;
        product.prodcut_name = name;
        product.prodcut_price = price;

        product.images = images.map((imageUrl) => {
            const img = new ProductImage();
            img.prodcut_image_url = imageUrl;
            return img;
        });

        const savedProduct = await productRepository.save(product);

        if(!savedProduct){
            throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.PRODUCT_NOT_CREATED)
        }
        return   savedProduct
    }

    getProductById = async (productId: string) => {
        const product = await productRepository.findOne({
            where: { prodcut_id: productId },
            relations: ["images"],
        });

        if (!product) throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.PRODUCT_NOT_FETCHED)

        return product;
    }

    getAllProducts = async () => {
        const products = await productRepository.find({ relations: ["images"] });
        if(products?.length < 1){
            throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.PRODUCTS_NOT_FETCHED)
        }
        return products}

    updateProduct = async (productId: string, sku?: string, name?: string, price?: number, images?: string[]) => {
        const product = await productRepository.findOne({ where: { prodcut_id: productId }, relations: ["images"] });

        if (!product) {
            throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.PRODUCT_NOT_FETCHED)
        }

        product.prodcut_sku = sku ?? product.prodcut_sku;
        product.prodcut_name = name ?? product.prodcut_name;
        product.prodcut_price = price ?? product.prodcut_price;

        if (images && Array.isArray(images)) {
            product.images = images.map((imageUrl) => {
                const img = new ProductImage();
                img.prodcut_image_url = imageUrl;
                return img;
            });
        }

        const updatedProduct = await productRepository.save(product);
        return updatedProduct;
    }

    deleteProduct = async (productId: string) => {
        const product = await productRepository.findOne({ where: { prodcut_id: productId } });

        if (!product) {
            throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.PRODUCT_NOT_FETCHED)
        }
        return await productRepository.remove(product);
    }
}

export default ProductService;

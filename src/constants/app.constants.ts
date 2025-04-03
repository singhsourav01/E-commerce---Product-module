export const PORT = 3000;

export const API_ENDPOINTS = {
    BASE: "/ecommerce",
    GET_PRODUCTS : "/products",
    CREATE_PRODUCT : "/product",
    PRODUCT : "/product/:id",
}

export const API_RESPONSES = {
    PRODUCT_CREATED: "Product created successfully",
    PRODUCT_UPDATED: "Product updated successfully",
    PRODUCT_DELETED: "Product deleted successfully",
    PRODUCT_FETCHED: "Product fetched successfully",
    PRODUCTS_FETCHED: "Product's fetched successfully",
}

export const API_ERRORS = {
    PRODUCT_NOT_CREATED: "Product not created",
    PRODUCT_NOT_UPDATED: "Product not updated",
    PRODUCT_NOT_DELETED: "Product not deleted",
    PRODUCT_NOT_FETCHED: "Product not found",
    PRODUCTS_NOT_FETCHED: "Product's not found",
    NO_DATA_FOUND: "No data found",
    INVALID_DATA: "Please provide valid data",
    DATABASE_ERROR: "Database Connection Failed",
}
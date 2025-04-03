import express from "express";
import { AppDataSource } from "./data-source";
import ProductRouter from "./routes/product.routes";
import { ApiError } from "common-microservices-utils";
import { StatusCodes } from "http-status-codes";
import { API_ERRORS , PORT} from "./constants/app.constants";

const app = express();
app.use(express.json());
app.use("/api", ProductRouter);

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected Successfully!"); // Testing purpose
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err)=> {   
        console.log(err)// Testing purpose
        throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.DATABASE_ERROR)
    })
    

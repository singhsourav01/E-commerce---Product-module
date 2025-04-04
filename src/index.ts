import express from "express";
import cors from "cors"; // ✅ Correct import
import { AppDataSource } from "./data-source";
import ProductRouter from "./routes/product.routes";
import { ApiError, errorHandler } from "common-microservices-utils";
import { StatusCodes } from "http-status-codes";
import { API_ERRORS , PORT } from "./constants/app.constants";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", ProductRouter);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
    throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.DATABASE_ERROR);
  });

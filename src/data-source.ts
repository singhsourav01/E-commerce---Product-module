import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true, 
    logging: false, 
    entities: [__dirname + "/entities/*.ts"], 
    subscribers: [],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

AppDataSource.initialize()
    .then(() => console.log("Database Connected Successfully"))
    .catch((error: any) => console.error("Database Connection Error: ", error));

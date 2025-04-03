import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    extra: {
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    },
    entities: ["dist/entities/**/*.js"]
    // type: "postgres",
    // host: process.env.DATABASE_HOST,
    // port: Number(process.env.DATABASE_PORT),
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    // synchronize: true, 
    // logging: false, 
    // entities: ["src/entities/*.ts"],
    // subscribers: [],
    // extra: {
    //     ssl: true,
    //   },
});


  
AppDataSource.initialize()
    .then(() => console.log("Database Connected Successfully"))
    .catch((error: any) => console.error("Database Connection Error: ", error));

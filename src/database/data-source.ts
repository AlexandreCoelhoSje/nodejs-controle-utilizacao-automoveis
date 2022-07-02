import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/database.sqlite",
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
});
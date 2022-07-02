import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
});

export { AppDataSource }
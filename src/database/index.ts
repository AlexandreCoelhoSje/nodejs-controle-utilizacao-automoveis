import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {

    console.log("database has been initialized");

}).catch(error => console.log(error));

export { AppDataSource }
import { AppDataSource } from "../data-source";

AppDataSource.initialize().then(async () => {

    console.log("mock database in memory has been initialized");

}).catch(error => console.log(error));

export { AppDataSource }

jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import { AppDataSource } from "../../src/database";
import { Driver } from "../../src/entities/Driver";
import { DriverRepository } from "../../src/repositories/DriverRepository";

describe("test DriverRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            console.log("database in memory has been initialized");

        }).catch(error => console.log(error));
    });

    it("Create driver", async () => {

        const driverRepository = new DriverRepository();

        const driver = new Driver();
        driver.name = "Paul Walker";

        const newDriver = await driverRepository.create(driver);

        expect(newDriver).toHaveProperty("id");
    });

    it("List driver", async () => {

        const driverRepository = new DriverRepository();

        const drivers = await driverRepository.list();

        expect(drivers).not.toBeNull();

        expect(drivers.length).toBeGreaterThanOrEqual(1);
    });

    it("List driver with filter", async () => {

        const driverRepository = new DriverRepository();

        //filter with return
        const driversFound = await driverRepository.list("Paul Walker");

        expect(driversFound.length).toBe(1);
        expect(driversFound[0].name).toBe("Paul Walker");

        //no return filter
        const drivers = await driverRepository.list("John");

        expect(drivers.length).toBe(0);
    });

    it("Detail driver", async () => {

        const driverRepository = new DriverRepository();

        //record found
        const driverFound = await driverRepository.detail(1);

        expect(driverFound).not.toBeNull();
        expect(driverFound).toHaveProperty("id");

        //register not found
        const driverNotFound = await driverRepository.detail(0);

        expect(driverNotFound).toBeNull();
    });

    it("Update driver", async () => {

        const driverRepository = new DriverRepository();

        //create driver
        const driver = new Driver();
        driver.name = "Vin Diesel";

        const newDriver = await driverRepository.create(driver);

        //update driver
        const driverUpdated = await driverRepository.update({ ...newDriver, name: "Vin Diesel - Edited" });

        expect(driverUpdated.name).toBe("Vin Diesel - Edited");
    });

    it("delete driver", async () => {

        const driverRepository = new DriverRepository();

        //create driver
        const driver = new Driver();
        driver.name = "Dwayne Johnson";

        const newDriver = await driverRepository.create(driver);

        //delete driver
        const driverFound = await driverRepository.delete(driver);

        expect(driverFound).toBe(newDriver);
    });
});
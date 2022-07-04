jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import { AppDataSource } from "../../src/database";
import { Driver } from "../../src/entities/Driver";
import { Vehicle } from "../../src/entities/Vehicle";
import { VehicleUse } from "../../src/entities/VehicleUse";
import { DriverRepository } from "../../src/repositories/DriverRepository";
import { VehicleRepository } from "../../src/repositories/VehicleRepository";
import { VehicleUseRepository } from "../../src/repositories/VehicleUseRepository";

describe("test VehicleUseRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            //Create a vehicle for test
            const vehicleRepository = new VehicleRepository();

            const vehicle = new Vehicle();
            vehicle.brand = "BMW";
            vehicle.licensePlate = "MHY-2022";
            vehicle.color = "black";

            await vehicleRepository.create(vehicle);

            //Create a driver for test
            const driverRepository = new DriverRepository();

            const driver = new Driver();
            driver.name = "Paul Walker";

            await driverRepository.create(driver);

        }).catch(error => console.log(error));
    });

    it("Create vehicleUse", async () => {

        const vehicleUseRepository = new VehicleUseRepository();

        const vehicleUse = new VehicleUse();
        vehicleUse.driverId = 1;
        vehicleUse.vehicleId = 1;
        vehicleUse.reason = "test reason to use a vehicle";
        vehicleUse.startDate = new Date();
        vehicleUse.endDate = new Date();

        const newVehicleUse = await vehicleUseRepository.create(vehicleUse);

        expect(newVehicleUse).toHaveProperty("id");
    });

    it("List vehicleUse", async () => {

        const vehicleUseRepository = new VehicleUseRepository();

        const vehicleUses = await vehicleUseRepository.list();

        expect(vehicleUses).not.toBeNull();

        expect(vehicleUses.length).toBeGreaterThanOrEqual(1);
    });

    it("Update vehicleUse", async () => {

        const vehicleUseRepository = new VehicleUseRepository();

        //create vehicleUse
        const vehicleUse = new VehicleUse();
        vehicleUse.driverId = 1;
        vehicleUse.vehicleId = 1;
        vehicleUse.reason = "test reason to use a vehicle";
        vehicleUse.startDate = new Date();

        const newVehicleUse = await vehicleUseRepository.create(vehicleUse);

        //update vehicleUse
        const vehicleUseUpdated = await vehicleUseRepository.update({ ...newVehicleUse, endDate: new Date() });

        expect(vehicleUseUpdated.endDate).not.toBeNull();
    });

    it("check vehicle is in use", async () => {

        const vehicleUseRepository = new VehicleUseRepository();

        const vehicleNotInUse = await vehicleUseRepository.checkVehicleUse(1);

        expect(vehicleNotInUse).toBeNull();
    });

    it("check driver is in use", async () => {

        const vehicleUseRepository = new VehicleUseRepository();

        const driverNotAvailable = await vehicleUseRepository.checkDriverBusy(1);

        expect(driverNotAvailable).toBeNull();
    });
});
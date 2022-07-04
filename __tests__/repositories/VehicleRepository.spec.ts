jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import { AppDataSource } from "../../src/database";
import { Vehicle } from "../../src/entities/Vehicle";
import { VehicleRepository } from "../../src/repositories/VehicleRepository";

describe("test VehicleRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

        }).catch(error => console.log(error));
    });   
    
    it("Create vehicle", async () => {

        const vehicleRepository = new VehicleRepository();

        const vehicle = new Vehicle();
        vehicle.brand = "BMW";
        vehicle.licensePlate = "MHY-2022";
        vehicle.color = "black";

        const newVehicle = await vehicleRepository.create(vehicle);

        expect(newVehicle).toHaveProperty("id");
    });

    it("List vehicle with filter", async () => {

        const driverRepository = new VehicleRepository();

        //filter with return
        const driversFound = await driverRepository.list("BMW", "black");

        expect(driversFound.length).toBe(1);
        expect(driversFound[0].brand).toBe("BMW");
        expect(driversFound[0].color).toBe("black");

        //no return filter
        const drivers = await driverRepository.list("Not Exists");

        expect(drivers.length).toBe(0);
    });

    it("List vehicle", async () => {

        const vehicleRepository = new VehicleRepository();

        const vehicles = await vehicleRepository.list();

        expect(vehicles).not.toBeNull();

        expect(vehicles.length).toBeGreaterThanOrEqual(1);
    });

    it("Detail vehicle", async () => {

        const vehicleRepository = new VehicleRepository();

        //update vehicle
        const vehicleDetailed = await vehicleRepository.detail(1);

        expect(vehicleDetailed).not.toBeNull();
    });

    it("Update vehicle", async () => {

        const vehicleRepository = new VehicleRepository();

        //create vehicle
        const vehicle = new Vehicle();
        vehicle.brand = "BMW";
        vehicle.licensePlate = "MHY-2022";
        vehicle.color = "black";

        const newVehicle = await vehicleRepository.create(vehicle);

        //update vehicle
        const vehicleUpdated = await vehicleRepository.update({ ...newVehicle, brand: "MBW Edited", licensePlate: "MHY-2023", color: "blue" });

        expect(vehicleUpdated.brand).toBe("MBW Edited");
        expect(vehicleUpdated.licensePlate).toBe("MHY-2023");
        expect(vehicleUpdated.color).toBe("blue");
    });

    it("delete vehicle", async () => {

        const vehicleRepository = new VehicleRepository();

        //create vehicle
        const vehicle = new Vehicle();
        vehicle.brand = "BMW";
        vehicle.licensePlate = "MHY-2022";
        vehicle.color = "black";

        const newVehicle = await vehicleRepository.create(vehicle);

        //delete vehicle
        const vehicleDeleted = await vehicleRepository.delete(vehicle);

        expect(vehicleDeleted).toBe(newVehicle);
    });
});
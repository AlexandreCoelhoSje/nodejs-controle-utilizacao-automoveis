jest.mock("../../src/repositories/VehicleRepository");

import { Vehicle } from "../../src/entities/Vehicle";
import { VehicleService } from "../../src/services/VehicleService";

describe("test VehicleService", () => {

    it("list vehicle", async () => {

        const vehicleService = new VehicleService();

        const list = await vehicleService.list();

        expect(list.length).toBeGreaterThanOrEqual(1);

        expect(list.pop()).toBeInstanceOf(Vehicle);
    });

    it("list vehicle with filter", async () => {

        const driverService = new VehicleService();

        const list = await driverService.list("BMW", "black");

        expect(list.length).toBe(1);
        expect(list[0].brand).toBe("BMW");
        expect(list[0].color).toBe("black");
    });

    it("list vehicle with filters returning empty list", async () => {

        const driverService = new VehicleService();

        const emptyList = await driverService.list("Not exist");

        expect(emptyList.length).toBe(0);
    });

    it("detail vehicle", async () => {

        const vehicleService = new VehicleService();

        const vehicle = await vehicleService.detail(1);

        expect(vehicle.id).toBe(1);
    });

    it("try to detail vehicle that does not exist", async () => {

        const driverService = new VehicleService();
               
        expect(driverService.detail(0)).rejects.toThrow("vehicle not found");
    });

    it("create vehicle", async () => {

        const vehicleService = new VehicleService();

        const vehicle = {
            brand: "BMW",
            licensePlate: "MHY-2022",
            color: "black"
        };

        const newVehicle = await vehicleService.create(vehicle);

        expect(newVehicle).toHaveProperty("id");
    });

    it("update vehicle successfully", async () => {

        const vehicleService = new VehicleService();

        const vehicle = {
            id: 1,
            brand: "BMW - Edited",
            licensePlate: "MHY-2023",
            color: "white"
        };

        const vehicleUpdated = await vehicleService.update(vehicle);

        expect(vehicleUpdated.brand).toBe("BMW - Edited");
        expect(vehicleUpdated.licensePlate).toBe("MHY-2023");
        expect(vehicleUpdated.color).toBe("white");
    });

    it("try to update vehicle that does not exist", async () => {

        const vehicleService = new VehicleService();

        const vehicle = {
            id: 0,
            brand: "",
            licensePlate: "",
            color: ""
        };

        expect(vehicleService.update(vehicle)).rejects.toThrow("vehicle not found");
    });

    it("delete vehicle successfully", async () => {

        const vehicleService = new VehicleService();

        const vehicleDeleted = await vehicleService.delete(2);

        expect(vehicleDeleted).not.toBeNull();
    });

    it("try to delete vehicle that does not exist", async () => {
        
        const vehicleService = new VehicleService();

        expect(vehicleService.delete(0)).rejects.toThrow("vehicle not found");
    });
});
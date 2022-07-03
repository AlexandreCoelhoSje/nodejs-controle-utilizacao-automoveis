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

    it("detail vehicle", async () => {

        const vehicleService = new VehicleService();

        const vehicle = await vehicleService.detail(1);

        expect(vehicle.id).toBe(1);
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
        expect(vehicleUpdated.license_plate).toBe("MHY-2023");
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
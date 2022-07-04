jest.mock("../../src/repositories/VehicleUseRepository");
jest.mock("../../src/repositories/DriverRepository");
jest.mock("../../src/repositories/VehicleRepository");

import { VehicleUse } from "../../src/entities/VehicleUse";
import { VehicleUseService } from "../../src/services/VehicleUseService";

describe("test VehicleUseService", () => {

    it("list vehicleUse", async () => {

        const vehicleUseService = new VehicleUseService();

        const list = await vehicleUseService.list();

        expect(list.length).toBeGreaterThanOrEqual(1);

        expect(list[0]).toBeInstanceOf(VehicleUse);
    });

    it("create vehicleUse", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = { 
            reason: "test reason", 
            startDate: new Date(), 
            endDate: new Date(), 
            driverId: 2, 
            vehicleId: 2 
        };

        const newVehicleUse = await vehicleUseService.create(vehicleUse);

        expect(newVehicleUse).toHaveProperty("id");
    });

    it("create vehicle with driver that does not exist", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = { 
            reason: "test reason", 
            startDate: new Date(), 
            endDate: new Date(), 
            driverId: 0,
            vehicleId: 1 
        };

        expect(vehicleUseService.create(vehicleUse)).rejects.toThrow("driver not found");
    });

    it("create vehicle with vehicle that does not exist", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = { 
            reason: "test reason", 
            startDate: new Date(), 
            endDate: new Date(), 
            driverId: 1,
            vehicleId: 0 
        };

        expect(vehicleUseService.create(vehicleUse)).rejects.toThrow("vehicle not found");
    });

    it("create vehicle with vehicle is in use", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = { 
            reason: "test reason", 
            startDate: new Date(), 
            endDate: new Date(), 
            driverId: 2,
            vehicleId: 1 
        };

        expect(vehicleUseService.create(vehicleUse)).rejects.toThrow("the vehicle is in use");
    });

    it("create vehicle with driver in use", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = { 
            reason: "test reason", 
            startDate: new Date(), 
            endDate: new Date(), 
            driverId: 1,
            vehicleId: 2 
        };

        expect(vehicleUseService.create(vehicleUse)).rejects.toThrow("the driver is already using another vehicle");
    });

    it("end use vehicleUse", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = {
            id: 1,
            endDate: new Date(),
        };

        const vehicleUseUpdated = await vehicleUseService.endUse(vehicleUse);

        expect(vehicleUseUpdated.endDate).toBe(vehicleUse.endDate);
    });

    it("end use vehicleUse with end date less than start date", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = {
            id: 1,
            endDate: new Date('2000-01-01'),
        };

        expect(vehicleUseService.endUse(vehicleUse)).rejects.toThrow("End date must be greater than start date");
    });

    it("try to end use vehicle that does not exist", async () => {

        const vehicleUseService = new VehicleUseService();

        const vehicleUse = {
            id: 0,
            endDate: new Date(),
        };

        expect(vehicleUseService.endUse(vehicleUse)).rejects.toThrow("register not found");
    });
});
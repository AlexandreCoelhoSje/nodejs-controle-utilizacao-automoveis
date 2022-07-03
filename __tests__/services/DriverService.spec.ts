jest.mock("../../src/repositories/DriverRepository");

import { Driver } from "../../src/entities/Driver";
import { DriverService } from "../../src/services/DriverService";

describe("test DriverService", () => {

    it("list driver", async () => {

        const driverService = new DriverService();

        const list = await driverService.list({});

        expect(list.length).toBeGreaterThanOrEqual(1);

        expect(list[0]).toBeInstanceOf(Driver);
    });

    it("list driver with filter", async () => {

        const driverService = new DriverService();

        const list = await driverService.list({ name: "Driver Default"});

        expect(list.length).toBe(1);
        expect(list[0].name).toBe("Driver Default");
    });

    it("list driver with filters returning empty list", async () => {

        const driverService = new DriverService();

        const emptyList = await driverService.list({name: "name does not exist"});

        expect(emptyList.length).toBe(0);
    });

    it("detail driver", async () => {

        const driverService = new DriverService();
       
        const driver = await driverService.detail(1);
        
        expect(driver).toHaveProperty("id");
        expect(driver.id).toBe(1);
    });

    it("try to detail driver that does not exist", async () => {

        const driverService = new DriverService();
               
        expect(driverService.detail(0)).rejects.toThrow("driver not found");
    });

    it("create driver", async () => {

        const driverService = new DriverService();

        const driver = {
            name: "Vin Diesel",
        };

        const newDriver = await driverService.create(driver);

        expect(newDriver).toHaveProperty("id");
    });

    it("update driver", async () => {

        const driverService = new DriverService();

        const driver = {
            id: 2,
            name: "Driver to Update - Edited",
        };

        const driverUpdated = await driverService.update(driver);

        expect(driverUpdated.name).toBe("Driver to Update - Edited");
    });

    it("try to update driver that does not exist", async () => {

        const driverService = new DriverService();

        const driver = {
            id: 0,
            name: ""
        };

        expect(driverService.update(driver)).rejects.toThrow("driver not found");
    });

    it("delete driver successfully", async () => {

        const driverService = new DriverService();

        const driverDeleted = await driverService.delete(3);

        expect(driverDeleted).not.toBeNull();
    });

    it("try to delete driver that does not exist", async () => {
        
        const driverService = new DriverService();

        expect(driverService.delete(0)).rejects.toThrow("driver not found");
    });
});
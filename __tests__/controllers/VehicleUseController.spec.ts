jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import request from "supertest";

import { app } from "../../src/server";
import { AppDataSource } from "../../src/database";
import { DriverService } from "../../src/services/DriverService";
import { VehicleService } from "../../src/services/VehicleService";

describe("Test VehicleUseController", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            //Driver for test
            const driverService = new DriverService();

            await driverService.create({ name: "Driver Available" });
            await driverService.create({ name: "Driver Not Available" });

            //Vehicle for test
            const vehicleService = new VehicleService();

            await vehicleService.create({ brand: "Vehicle Available", licensePlate: "MHY-2022", color: "black" });
            await vehicleService.create({ brand: "Vehicle In Ise", licensePlate: "MHY-2021", color: "white" });

        }).catch(error => console.log(error));
    });

    it("request to list vehicle use", async () => {

        const testRequest = await request(app)
            .get("/vehicleUse")
            .send();

        expect(testRequest.status).toBe(200);
    });

    it("request for vehicle use recorder", async () => {

        const testRequest = await request(app)
            .post("/vehicleUse")
            .send({
                reason: "reason test", 
                startDate: "2022-07-04",
                driverId: 2, 
                vehicleId: 2 
            });

        expect(testRequest.status).toBe(201);
    });

    it("request to record use of a vehicle not available", async () => {

        const testRequest = await request(app)
            .post("/vehicleUse")
            .send({
                reason: "reason test", 
                startDate: "2022-07-04",
                driverId: 1, 
                vehicleId: 2 
            });

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch("the vehicle is in use");
    });

    it("request to record use of a vehicle by an unavailable driver", async () => {

        const testRequest = await request(app)
            .post("/vehicleUse")
            .send({
                reason: "reason test", 
                startDate: "2022-07-04",
                driverId: 2, 
                vehicleId: 1 
            });

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch("the driver is already using another vehicle");
    });

    it("request to terminate the use of a vehicle", async () => {

        const testRequest = await request(app)
            .put("/vehicleUse")
            .send({
                id: 1,
                endDate: "2022-07-05"
            });

        expect(testRequest.status).toBe(204);
    });

    it("request to terminate the use of a vehicle with wrong param", async () => {

        const testRequest = await request(app)
            .put("/vehicleUse")
            .send({});

        expect(testRequest.status).toBe(400);
    });
});
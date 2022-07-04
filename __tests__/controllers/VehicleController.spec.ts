jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import request from "supertest"

import { app } from "../../src/server"
import { AppDataSource } from "../../src/database"
import { Vehicle } from "../../src/entities/Vehicle";
import { VehicleService } from "../../src/services/VehicleService";

describe("Test VehicleController", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            const vehicleService = new VehicleService();

            const vehicle = {
                brand: "BMW",
                licensePlate: "MHY-2022",
                color: "black"
            };

            await vehicleService.create(vehicle);

            console.log("database in memory has been initialized");

        }).catch(error => console.log(error));
    });

    it("request to list vehicles", async () => {

        const testRequest = await request(app)
            .get("/vehicle")
            .send();

        expect(testRequest.status).toBe(200);
    });

    it("request to recover a vehicle", async () => {

        const testRequest = await request(app)
            .get("/vehicle/1")
            .send();

        expect(testRequest.status).toBe(200);
        expect(testRequest.body).toHaveProperty("id");
    });

    it("request to recover a vehicle with wrong parameters", async () => {

        const testRequest = await request(app)
            .get("/vehicle/p")
            .send();

        expect(testRequest.status).toBe(400);
    });

    it("request to recover a vehicle that does not exist", async () => {

        const testRequest = await request(app)
            .get("/vehicle/0")
            .send();

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch(/vehicle not found/);
    });

    it("request to create vehicles successfully", async () => {

        const testRequest = await request(app)
            .post("/vehicle")
            .send({
                brand: "fiat",
                licensePlate: "ADA-1256",
                color: "black"
            });

        expect(testRequest.status).toBe(201);
    });

    it("request to create vehicle with wrong parameters", async () => {

        const testRequest = await request(app)
            .post("/vehicle")
            .send({
                brand: "",
                licensePlate: "",
                color: ""
            });

        expect(testRequest.status).toBe(400);
    });

    it("request to update vehicle", async () => {

        const testRequest = await request(app)
            .put("/vehicle")
            .send({
                id: 1,
                brand: "BMW",
                licensePlate: "OOP-5689",
                color: "white"
            });

        expect(testRequest.status).toBe(204);
    });

    it("request to update vehicle that does not exist", async () => {

        const testRequest = await request(app)
            .put("/vehicle")
            .send({
                id: 0,
                brand: "BMW",
                licensePlate: "OOP-5689",
                color: "white"
            });

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch("vehicle not found");
    });

    it("request to update vehicle with wrong parameters", async () => {

        const testRequest = await request(app)
            .put("/vehicle")
            .send();

        expect(testRequest.status).toBe(400);
    });

    it("request to delete vehicle that does not exist", async () => {

        const testRequest = await request(app)
            .delete("/vehicle/0")
            .send();

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch(/vehicle not found/);
    });

    it("request to delete vehicle with wrong parameters", async () => {

        const testRequest = await request(app)
            .delete("/vehicle/p")
            .send();

        expect(testRequest.status).toBe(400);
    });

    it("request to delete vehicle", async () => {

        const testRequest = await request(app)
            .delete("/vehicle/1")
            .send();

        expect(testRequest.status).toBe(204);
    });
});
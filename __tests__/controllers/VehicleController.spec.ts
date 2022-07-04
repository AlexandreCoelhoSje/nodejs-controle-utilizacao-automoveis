jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import request from "supertest"

import { app } from "../../src/server"
import { AppDataSource } from "../../src/database"
import { VehicleService } from "../../src/services/VehicleService";

describe("Test VehicleController", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            const vehicleService = new VehicleService();

            await vehicleService.create({ brand: "BMW", licensePlate: "Default-2022", color: "black" });
            await vehicleService.create({ brand: "BMW", licensePlate: "Update-2022", color: "silver" });
            await vehicleService.create({ brand: "BMW", licensePlate: "Delete-2022", color: "white" });

        }).catch(error => console.log(error));
    });

    it("request to list vehicles", async () => {

        const testRequest = await request(app)
            .get("/vehicle")
            .send();

        expect(testRequest.status).toBe(200);
    });

    it("list vehicle with filter", async () => {

        const testRequest = await request(app)
            .get("/vehicle")
            .query({
                brand: "BMW",
                color: "black"
            })
            .send();

        expect(testRequest.status).toBe(200);
        expect(testRequest.body[0].brand).toBe("BMW");
        expect(testRequest.body[0].color).toBe("black");
    });

    it("list vehicle with filters returning empty list", async () => {

        const testRequest = await request(app)
            .get("/vehicle")
            .query({
                brand: "Not Exist",
                color: "Not Exists"
            })
            .send();

        expect(testRequest.status).toBe(200);
        expect(testRequest.body.length).toBe(0);
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
                id: 2,
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
            .delete("/vehicle/3")
            .send();

        expect(testRequest.status).toBe(204);
    });
});
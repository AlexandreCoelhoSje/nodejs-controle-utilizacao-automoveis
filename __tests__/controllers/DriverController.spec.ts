jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import request from "supertest";

import { app } from "../../src/server";
import { AppDataSource } from "../../src/database";
import { DriverService } from "../../src/services/DriverService";

describe("Test DriverController", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            const driverService = new DriverService();

            await driverService.create({ name: "Driver Default" });
            await driverService.create({ name: "Driver to Update" });
            await driverService.create({ name: "Driver to Delete" });

        }).catch(error => console.log(error));
    });

    it("request to list drivers", async () => {

        const testRequest = await request(app)
            .get("/driver")
            .send();
            
        expect(testRequest.status).toBe(200);        
    });

    it("list driver with filter", async () => {

        const testRequest = await request(app)
            .get("/driver")
            .query({name: "Driver Default"})
            .send();

        expect(testRequest.status).toBe(200);
        expect(testRequest.body[0].name).toBe("Driver Default");
    });

    it("list driver with filters returning empty list", async () => {

        const testRequest = await request(app)
            .get("/driver")
            .query({name: "Driver Not Exists"})
            .send();

        expect(testRequest.status).toBe(200);
        expect(testRequest.body.length).toBe(0);
    });

    it("request to recover a driver", async () => {

        const testRequest = await request(app)
            .get("/driver/1")
            .send();

        expect(testRequest.status).toBe(200);
        expect(testRequest.body).toHaveProperty("id");
    });

    it("request to recover a driver with wrong parameters", async () => {

        const testRequest = await request(app)
            .get("/driver/p")
            .send();

        expect(testRequest.status).toBe(400);
    });

    it("request to recover a driver that does not exist", async () => {

        const testRequest = await request(app)
            .get("/driver/0")
            .send();

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch("driver not found");
    });

    it("request to create drivers successfully", async () => {

        const testRequest = await request(app)
            .post("/driver")
            .send({
                name: "new Driver",
            });

        expect(testRequest.status).toBe(201);
    });

    it("request to create driver with wrong parameters", async () => {

        const testRequest = await request(app)
            .post("/driver")
            .send({
                name: ""
            });

        expect(testRequest.status).toBe(400);
    });

    it("request to update driver", async () => {

        const testRequest = await request(app)
            .put("/driver")
            .send({
                id: 2,
                name: "Driver Updated"
            });

        expect(testRequest.status).toBe(204);
    });

    it("request to update driver that does not exist", async () => {

        const testRequest = await request(app)
            .put("/driver")
            .send({
                id: 0,
                name: "Driver Not Exists"
            });

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch(/driver not found/);
    });

    it("request to update driver with wrong parameters", async () => {

        const testRequest = await request(app)
            .put("/driver")
            .send();

        expect(testRequest.status).toBe(400);
    });

    it("request to delete driver that does not exist", async () => {

        const testRequest = await request(app)
            .delete("/driver/0")
            .send();

        expect(testRequest.status).toBe(400);
        expect(testRequest.body.error).toMatch(/driver not found/);
    });

    it("request to delete driver with wrong parameters", async () => {

        const testRequest = await request(app)
            .delete("/driver/p")
            .send();

        expect(testRequest.status).toBe(400);
    });

    it("request to delete driver", async () => {

        const testRequest = await request(app)
            .delete("/driver/3")
            .send();

        expect(testRequest.status).toBe(204);
    });
});
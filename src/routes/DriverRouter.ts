import { Router } from "express";
import { param, body, query } from "express-validator"
import { DriverController } from "../controllers/DriverController"
import { ensureValidation } from "../middlewares/ensureValidation"

export function DriverRouter(router: Router) {

    const driverController = new DriverController();

    router.get("/driver",
        query("name").optional().trim(),
        ensureValidation,
        driverController.list
    );

    router.get("/driver/:id",
        param("id").isNumeric(),
        ensureValidation,
        driverController.detail
    );

    router.post("/driver",
        body("name").notEmpty().escape().trim(),
        ensureValidation,
        driverController.create
    );

    router.put("/driver",
        body("id").isNumeric(),
        body("name").notEmpty().escape().trim(),
        ensureValidation,
        driverController.update
    );

    router.delete("/driver/:id",
        param("id").isNumeric(),
        ensureValidation,
        driverController.delete
    );
}
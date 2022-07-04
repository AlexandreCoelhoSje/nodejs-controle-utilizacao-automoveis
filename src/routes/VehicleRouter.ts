import { Router } from "express";
import { param, body } from "express-validator"
import { VehicleController } from "../controllers/VehicleController"
import { ensureValidation } from "../middlewares/ensureValidation"

export function VehicleRouter(router: Router) {

    const vehicleController = new VehicleController();

    router.get("/vehicle", vehicleController.list);

    router.get("/vehicle/:id",
        param("id").isNumeric(),
        ensureValidation,
        vehicleController.detail
    );

    router.post("/vehicle",
        body("brand").notEmpty().trim(),
        body("licensePlate").notEmpty().trim(),
        body("color").notEmpty().trim(),
        ensureValidation,
        vehicleController.create
    );

    router.put("/vehicle/",
        body("id").isNumeric(),
        body("brand").notEmpty().trim(),
        body("licensePlate").notEmpty().trim(),
        body("color").notEmpty().trim(),
        ensureValidation,
        vehicleController.update
    );

    router.delete("/vehicle/:id",
        param("id").isNumeric(),
        ensureValidation,
        vehicleController.delete
    );
}
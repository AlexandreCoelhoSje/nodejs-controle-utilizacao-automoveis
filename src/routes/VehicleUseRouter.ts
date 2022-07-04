import { Router } from "express";
import { body } from "express-validator"
import { VehicleUseController } from "../controllers/VehicleUseController"
import { ensureValidation } from "../middlewares/ensureValidation"

export function VehicleUseRouter(router: Router) {

    const vehicleUseController = new VehicleUseController();

    router.get("/vehicleUse", vehicleUseController.list);

    router.post("/vehicleUse",
        body("reason").notEmpty().escape().trim(),
        body("startDate").isDate(),
        body("endDate").isDate().optional(),
        body("driverId").isNumeric(),
        body("vehicleId").isNumeric(),
        ensureValidation,
        vehicleUseController.create
    );

    router.put("/vehicleUse",
        body("id").isNumeric(),
        body("endDate").isDate(),
        ensureValidation,
        vehicleUseController.endUse
    );
}
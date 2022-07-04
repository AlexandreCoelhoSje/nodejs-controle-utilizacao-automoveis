import { Router } from "express";
import { DriverRouter } from "./DriverRouter";
import { VehicleRouter } from "./VehicleRouter";
import { VehicleUseRouter } from "./VehicleUseRouter";

const router = Router();

DriverRouter(router);
VehicleRouter(router);
VehicleUseRouter(router);

export { router }
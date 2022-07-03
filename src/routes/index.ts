import { Router } from "express";
import { VehicleRouter } from "./VehicleRouter";

const router = Router();

VehicleRouter(router);

export { router }
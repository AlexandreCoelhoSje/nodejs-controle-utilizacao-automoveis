import { Request, Response } from "express";
import { VehicleService } from "../services/VehicleService";

export class VehicleController {

    async list(request: Request, response: Response) {
       
        const vehicleService = new VehicleService();
       
        const vehicles = await vehicleService.list();
        
        return response.json(vehicles);
    }

    async detail(request: Request, response: Response) {

        const vehicleService = new VehicleService();

        const { id } = request.params;

        const vehicle = await vehicleService.detail(parseInt(id));

        if (vehicle)
            return response.json(vehicle);
        else
            return response.status(404).send();
    }

    async create(request: Request, response: Response) {

        const vehicleService = new VehicleService();

        const { brand, licensePlate, color } = request.body;

        const vehicle = await vehicleService.create({ brand, licensePlate, color });

        return response.status(201).json(vehicle);
    }

    async update(request: Request, response: Response) {

        const vehicleService = new VehicleService();

        const { id } = request.params;

        const { brand, licensePlate, color } = request.body;

        await vehicleService.update({ id: parseInt(id), brand, licensePlate, color });

        return response.json();
    }

    async delete(request: Request, response: Response) {

        const vehicleService = new VehicleService();

        const { id } = request.params;
        
        await vehicleService.delete(parseInt(id));

        return response.json();
    }
}
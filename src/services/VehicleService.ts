import { Vehicle } from "../entities/Vehicle";
import { VehicleRepository } from "../repositories/VehicleRepository";

interface IVehicleRequest {
    id?: number;
    brand: string;
    licensePlate: string;
    color: string;
}
export class VehicleService {

    vehicleRepository: VehicleRepository;

    constructor() {

        this.vehicleRepository = new VehicleRepository();
    }

    async list(): Promise<Vehicle[]> {

        return await this.vehicleRepository.list();
    }

    async detail(id: number): Promise<Vehicle> {

        //check if the vehicle exists
        const vehicleFound = await this.vehicleRepository.detail(id);

        if (!vehicleFound)
            throw new Error("vehicle not found");

        return vehicleFound;
    }

    async create({ brand, licensePlate, color }: IVehicleRequest): Promise<Vehicle> {

        const vehicle = new Vehicle();
        vehicle.brand = brand;
        vehicle.license_plate = licensePlate;
        vehicle.color = color;

        return await this.vehicleRepository.create(vehicle);
    }

    async update({ id, brand, licensePlate, color }: IVehicleRequest): Promise<Vehicle> {

        //check if the vehicle exists
        const vehicleFound = await this.vehicleRepository.detail(id);

        if (!vehicleFound)
            throw new Error("vehicle not found");

        //update vehicle
        vehicleFound.brand = brand;
        vehicleFound.license_plate = licensePlate;
        vehicleFound.color = color;

        //save changes
        return await this.vehicleRepository.update(vehicleFound);
    }

    async delete(id: number): Promise<Vehicle> {

        //check if the vehicle exists
        const vehicleFound = await this.vehicleRepository.detail(id);

        if (!vehicleFound)
            throw new Error("vehicle not found");

        return await this.vehicleRepository.delete(vehicleFound);
    }
}
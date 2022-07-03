import { Repository } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { AppDataSource } from "../database/data-source";
import { IVehicleRepository } from "../interfaces/repositories/IVehicleRepository";

export class VehicleRepository implements IVehicleRepository {
    
    vehicleRepository: Repository<Vehicle>;

    constructor() {

        this.vehicleRepository = AppDataSource.getRepository(Vehicle);
    }

    async list(): Promise<Vehicle[]> {

        return await this.vehicleRepository.find();
    }

    async detail(id: number): Promise<Vehicle> {

        return await this.vehicleRepository.findOneBy({ id });
    }

    async create(vehicle: Vehicle): Promise<Vehicle> {

        return await this.vehicleRepository.save(vehicle);
    }

    async update(vehicle: Vehicle): Promise<Vehicle> {

        return await this.vehicleRepository.save(vehicle);
    }

    async delete(vehicle: Vehicle): Promise<Vehicle> {

        return this.vehicleRepository.remove(vehicle);
    }
}
import { FindManyOptions, FindOperator, Like, Repository } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { AppDataSource } from "../database/data-source";
import { IVehicleRepository } from "../interfaces/repositories/IVehicleRepository";

export class VehicleRepository implements IVehicleRepository {

    vehicleRepository: Repository<Vehicle>;

    constructor() {

        this.vehicleRepository = AppDataSource.getRepository(Vehicle);
    }

    async list(brand?: string, color?: string): Promise<Vehicle[]> {

        return await this.vehicleRepository.find({
            where: {
                brand: brand ? Like("%" + brand + "%") : undefined,
                color: color ? Like("%" + color + "%") : undefined
            }
        });
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
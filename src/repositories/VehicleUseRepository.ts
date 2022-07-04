import { Repository } from "typeorm";
import { VehicleUse } from "../entities/VehicleUse";
import { AppDataSource } from "../database/data-source";
import { IVehicleUseRepository } from "../interfaces/repositories/IVehicleUseRepository";

export class VehicleUseRepository implements IVehicleUseRepository {
    
    vehicleUseRepository: Repository<VehicleUse>;

    constructor() {

        this.vehicleUseRepository = AppDataSource.getRepository(VehicleUse);
    }

    async list(): Promise<VehicleUse[]> {

        return await this.vehicleUseRepository.find();
    }

    async create(vehicleUse: VehicleUse): Promise<VehicleUse> {

        return await this.vehicleUseRepository.save(vehicleUse);
    }

    async update(vehicleUse: VehicleUse): Promise<VehicleUse> {

        return await this.vehicleUseRepository.save(vehicleUse);
    }
}
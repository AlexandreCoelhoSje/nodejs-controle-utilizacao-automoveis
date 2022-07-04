import { IsNull, Repository } from "typeorm";
import { VehicleUse } from "../entities/VehicleUse";
import { AppDataSource } from "../database/data-source";
import { IVehicleUseRepository } from "../interfaces/repositories/IVehicleUseRepository";

export class VehicleUseRepository implements IVehicleUseRepository {
    
    vehicleUseRepository: Repository<VehicleUse>;

    constructor() {

        this.vehicleUseRepository = AppDataSource.getRepository(VehicleUse);
    }

    async list(): Promise<VehicleUse[]> {

        return await this.vehicleUseRepository.find({
            relations: ['driver', 'vehicle']
        });
    }

    async detail(id: number): Promise<VehicleUse> {

        return await this.vehicleUseRepository.findOneBy({ id });
    }

    async checkVehicleUse(vehicleId: number): Promise<VehicleUse> {

        return await this.vehicleUseRepository.findOne({
            where: {
                vehicleId: vehicleId,
                endDate: IsNull()
            }
        });
    }

    async checkDriverAvailable(driverId: number): Promise<VehicleUse> {

        return await this.vehicleUseRepository.findOne({
            where: {
                driverId: driverId,
                endDate: IsNull()
            }
        });
    }

    async create(vehicleUse: VehicleUse): Promise<VehicleUse> {

        return await this.vehicleUseRepository.save(vehicleUse);
    }

    async update(vehicleUse: VehicleUse): Promise<VehicleUse> {

        return await this.vehicleUseRepository.save(vehicleUse);
    }
}
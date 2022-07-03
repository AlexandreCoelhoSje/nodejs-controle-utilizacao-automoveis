import { Repository } from "typeorm";
import { Driver } from "../entities/Driver";
import { AppDataSource } from "../database/data-source";
import { IDriverRepository } from "../interfaces/repositories/IDriverRepository";

export class DriverRepository implements IDriverRepository {

    driverRepository: Repository<Driver>;

    constructor() {

        this.driverRepository = AppDataSource.getRepository(Driver);
    }

    async list(name?: string): Promise<Driver[]> {

        return await this.driverRepository.find({ where: { name } });
    }

    async detail(id: number): Promise<Driver> {

        return await this.driverRepository.findOneBy({ id });
    }

    async create(driver: Driver): Promise<Driver> {

        return await this.driverRepository.save(driver);
    }

    async update(driver: Driver): Promise<Driver> {

        return await this.driverRepository.save(driver);
    }

    async delete(driver: Driver): Promise<Driver> {

        return this.driverRepository.remove(driver);
    }
}
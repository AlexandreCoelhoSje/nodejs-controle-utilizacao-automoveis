import { Driver } from "../entities/Driver";
import { DriverRepository } from "../repositories/DriverRepository";

interface IDriverRequest {
    id?: number;
    name?: string;
}
export class DriverService {

    driverRepository: DriverRepository;

    constructor() {

        this.driverRepository = new DriverRepository();
    }

    async list({ name }: IDriverRequest): Promise<Driver[]> {

        return await this.driverRepository.list(name);
    }

    async detail(id: number): Promise<Driver> {

        //check if the driver exists
        const driverFound = await this.driverRepository.detail(id);

        if (!driverFound)
            throw new Error("driver not found");

        return driverFound;
    }

    async create({name }: IDriverRequest): Promise<Driver> {

        const driver = new Driver();
        driver.name = name;

        return await this.driverRepository.create(driver);
    }

    async update({ id, name }: IDriverRequest): Promise<Driver> {

        //check if the driver exists
        const driverFound = await this.driverRepository.detail(id);

        if (!driverFound)
            throw new Error("driver not found");

        //update driver
        driverFound.name = name;

        //save changes
        return await this.driverRepository.update(driverFound);
    }

    async delete(id: number): Promise<Driver> {

        //check if the driver exists
        const driverFound = await this.driverRepository.detail(id);

        if (!driverFound)
            throw new Error("driver not found");

        return await this.driverRepository.delete(driverFound);
    }
}
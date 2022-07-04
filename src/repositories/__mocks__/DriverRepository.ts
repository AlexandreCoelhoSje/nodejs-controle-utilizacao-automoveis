import { Driver } from "../../entities/Driver";
import { IDriverRepository } from "../../interfaces/repositories/IDriverRepository";

export class DriverRepository implements IDriverRepository {
    
    drivers: Driver[];

    constructor() {

        this.drivers = new Array();

        const driver1 = new Driver();
        driver1.id = 1;
        driver1.name = "Driver Default";

        this.drivers.push(driver1);

        const driver2 = new Driver();
        driver2.id = 2;
        driver2.name = "Driver to Update";

        this.drivers.push(driver2);

        const driver3 = new Driver();
        driver3.id = 3;
        driver3.name = "Driver to Delete";

        this.drivers.push(driver3);
    }

    async list(name: string = ''): Promise<Driver[]> {

        return new Promise((resolve, reject) => {

            resolve(this.drivers.filter((item) => item.name.includes(name)));
        });
    }

    async detail(id: number): Promise<Driver> {

        return new Promise((resolve, reject) => {

            resolve(this.drivers.find((item) => item.id == id));
        });
    }

    async create(driver: Driver): Promise<Driver> {

        driver.id = this.getID();

        this.drivers.push(driver);

        return new Promise((resolve, reject) => resolve(driver));
    }

    async update(driver: Driver): Promise<Driver> {

        const entityToUpdate = this.drivers.find((current: Driver) => driver.id == current.id);

        entityToUpdate.name = driver.name;

        return new Promise((resolve, rejects) => resolve(entityToUpdate));
    }

    async delete(driver: Driver): Promise<Driver> {

        const entityFound = this.drivers.find((current: Driver) => current.id == driver.id);

        this.drivers = this.drivers.filter((current: Driver) => current.id != driver.id);

        return new Promise((resolve, reject) => resolve(entityFound));
    }

    getID(): number {
        
        return this.drivers.length + 1;
    }
}
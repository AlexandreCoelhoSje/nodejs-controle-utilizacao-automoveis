import { VehicleUse } from "../../entities/VehicleUse";
import { IVehicleUseRepository } from "../../interfaces/repositories/IVehicleUseRepository";
import { Driver } from "../../entities/Driver";
import { Vehicle } from "../../entities/Vehicle";

export class VehicleUseRepository implements IVehicleUseRepository {
    
    vehiclesUse: VehicleUse[];

    constructor() {

        this.vehiclesUse = new Array();

        //Create a driver
        const driver = new Driver();
        driver.id = 1;
        driver.name = "Paul Walker";

        //create vehicle
        const vehicle = new Vehicle();
        vehicle.id = 1;
        vehicle.brand = "BMW";
        vehicle.license_plate = "MHY-2022";
        vehicle.color = "black";        

        //create vehicleUse
        const vehicleUse = new VehicleUse();
        vehicleUse.id = 1;
        vehicleUse.reason = "motive to test";
        vehicleUse.startDate = new Date();
        
        vehicleUse.driverId = driver.id;
        vehicleUse.driver = driver;
        vehicleUse.vehicleId = vehicle.id;
        vehicleUse.vehicle = vehicle;

        this.vehiclesUse.push(vehicleUse);
    }

    async list(): Promise<VehicleUse[]> {

        return new Promise((resolve, reject) => resolve(this.vehiclesUse));
    }

    async detail(id: number): Promise<VehicleUse> {

        return new Promise((resolve, reject) => {

            resolve(this.vehiclesUse.find((item) => item.id == id));
        });
    }

    async checkVehicleUse(vehicleId: number): Promise<VehicleUse> {

        return new Promise((resolve, reject) => {

            resolve(this.vehiclesUse.find((item) => item.id == vehicleId && !item.endDate));
        });
    }

    async checkDriverAvailable(driverId: number): Promise<VehicleUse> {

        return new Promise((resolve, reject) => {

            resolve(this.vehiclesUse.find((item) => item.id == driverId && !item.endDate));
        });
    }

    async create(vehicleUse: VehicleUse): Promise<VehicleUse> {

        vehicleUse.id = this.getID();

        this.vehiclesUse.push(vehicleUse);

        return new Promise((resolve, reject) => resolve(vehicleUse));
    }

    async update(vehicleUse: VehicleUse): Promise<VehicleUse> {

        const entityToUpdate = this.vehiclesUse.find((current: VehicleUse) => vehicleUse.id == current.id);

        entityToUpdate.endDate = vehicleUse.endDate;

        return new Promise((resolve, rejects) => resolve(entityToUpdate));
    }

    getID(): number {
        
        return this.vehiclesUse.length + 1;
    }
}
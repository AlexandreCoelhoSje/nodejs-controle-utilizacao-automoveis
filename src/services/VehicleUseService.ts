import { VehicleUse } from "../entities/VehicleUse";
import { VehicleRepository } from "../repositories/VehicleRepository";
import { VehicleUseRepository } from "../repositories/VehicleUseRepository";
import { DriverRepository } from "../repositories/DriverRepository";

interface IVehicleUseRequest {
    id?: number;
    reason?: string;
    startDate?: Date;
    endDate?: Date;
    driverId?: number;
    vehicleId?: number;
}
export class VehicleUseService {

    vehicleUseRepository: VehicleUseRepository;

    constructor() {

        this.vehicleUseRepository = new VehicleUseRepository();
    }

    async list(): Promise<VehicleUse[]> {

        return await this.vehicleUseRepository.list();
    }

    async create({ reason, startDate, endDate, driverId, vehicleId }: IVehicleUseRequest): Promise<VehicleUse> {

        const vehicleRepository = new VehicleRepository();
        const driverRepository = new DriverRepository();

        const driverFound = await driverRepository.detail(driverId);

        if (!driverFound)
            throw new Error("driver not found");

        const vehicleFound = await vehicleRepository.detail(vehicleId);

        if (!vehicleFound)
            throw new Error("vehicle not found");

        //A vehicle can only be used by one driver at a time
        const vehicleIsFree = await this.checkVehicleFree(vehicleId);

        if (!vehicleIsFree)
            throw new Error("the vehicle is in use");

        //A driver who is already using a car cannot use another car at the same time
        const driverIsFree = await this.checkDriverFree(driverId);

        if (!driverIsFree)
            throw new Error("the driver is already using another vehicle");

        const vehicleUse = new VehicleUse();
        vehicleUse.driverId = driverId;
        vehicleUse.vehicleId = vehicleId;
        vehicleUse.reason = reason;
        vehicleUse.startDate = startDate;
        vehicleUse.endDate = endDate;

        return await this.vehicleUseRepository.create(vehicleUse);
    }

    async endUse({ id, endDate }: IVehicleUseRequest): Promise<VehicleUse> {

        //check if the vehicleUse exists
        const vehicleUseFound = await this.vehicleUseRepository.detail(id);

        if (!vehicleUseFound)
            throw new Error("register not found");

        //update vehicleUse
        vehicleUseFound.endDate = endDate;

        //save changes
        return await this.vehicleUseRepository.update(vehicleUseFound);
    }

    /**
     * Checks if the specified vehicle is available
     * @param vehicleId 
     * @returns true if TRUE vehicle is available or FALSE if the vehicle is not available
     */
    async checkVehicleFree(vehicleId: number): Promise<boolean> {

        const vehicleIsBusy = await this.vehicleUseRepository.checkVehicleUse(vehicleId);

        return vehicleIsBusy ? false : true;
    }

    /**
     * Checks if the specified driver is available
     * @param driverId 
     * @returns true if TRUE driver is available or FALSE if the driver is not available
     */
    async checkDriverFree(driverId: number): Promise<boolean> {

        const driverIsBusy = await this.vehicleUseRepository.checkDriverBusy(driverId);

        return driverIsBusy ? false : true;
    }
}
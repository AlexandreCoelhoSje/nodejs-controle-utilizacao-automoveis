import { VehicleUse } from "../../entities/VehicleUse";

export interface IVehicleUseRepository {

    list: () => Promise<VehicleUse[]>;

    detail: (id: number) => Promise<VehicleUse>;

    create: (vehicleUse: VehicleUse) => Promise<VehicleUse>;

    checkDriverAvailable(driverId: number): Promise<VehicleUse>;

    checkVehicleUse(vehicleId: number): Promise<VehicleUse>;

    update: (vehicleUse: VehicleUse) => Promise<VehicleUse>;
}
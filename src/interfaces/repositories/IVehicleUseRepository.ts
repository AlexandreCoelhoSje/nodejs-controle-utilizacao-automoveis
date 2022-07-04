import { VehicleUse } from "../../entities/VehicleUse";

export interface IVehicleUseRepository {

    list: () => Promise<VehicleUse[]>;

    create: (vehicleUse: VehicleUse) => Promise<VehicleUse>;

    update: (vehicleUse: VehicleUse) => Promise<VehicleUse>;
}
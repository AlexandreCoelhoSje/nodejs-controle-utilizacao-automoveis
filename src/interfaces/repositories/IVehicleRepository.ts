import { Vehicle } from "../../entities/Vehicle";

export interface IVehicleRepository {

    list: () => Promise<Vehicle[]>;

    detail: (id: number) => Promise<Vehicle>;

    create: (vehicle: Vehicle) => Promise<Vehicle>;

    update: (vehicle: Vehicle) => Promise<Vehicle>;

    delete: (vehicle: Vehicle) => Promise<Vehicle>;
}
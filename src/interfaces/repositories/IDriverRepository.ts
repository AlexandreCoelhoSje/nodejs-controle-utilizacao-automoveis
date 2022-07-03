import { Driver } from "../../entities/Driver";

export interface IDriverRepository {

    list: (name: string) => Promise<Driver[]>;

    detail: (id: number) => Promise<Driver>;

    create: (vehicle: Driver) => Promise<Driver>;

    update: (vehicle: Driver) => Promise<Driver>;

    delete: (vehicle: Driver) => Promise<Driver>;
}
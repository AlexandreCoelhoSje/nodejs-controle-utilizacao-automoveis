import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { VehicleUse } from "./VehicleUse";

@Entity("vehicle")
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "license_plate"})
    licensePlate: string;

    @Column()
    color: string;

    @Column()
    brand: string;    

    @OneToMany(() => VehicleUse, (vehicleUse) => vehicleUse.vehicle)
    usedVehicles: VehicleUse[];

    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
}
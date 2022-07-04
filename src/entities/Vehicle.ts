import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { VehicleUse } from "./VehicleUse";

@Entity("vehicle")
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    license_plate: string;

    @Column()
    color: string;

    @Column()
    brand: string;    

    @OneToMany(() => VehicleUse, (vehicleUse) => vehicleUse.vehicle)
    usedVehicles: VehicleUse[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
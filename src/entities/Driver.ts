import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { VehicleUse } from "./VehicleUse";

@Entity("driver")
export class Driver {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @OneToMany(() => VehicleUse, (vehicleUse) => vehicleUse.driver)
    usedVehicles: VehicleUse[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
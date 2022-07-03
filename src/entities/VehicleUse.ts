import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";

@Entity("vehicle_use")
export class VehicleUse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_date" })
    startDate: Date;

    @Column({ name: "end_date" })
    endDate: Date;

    @Column()
    reason: string;

    @Column()
    driverId: string;

    @Column()
    vehicleId: string;

    @JoinColumn({name: "driverId"})
    @ManyToOne(() => Driver, (driver) => driver.usedVehicles)
    driver: Driver;

    @JoinColumn({name: "vehicleId"})
    @ManyToOne(() => Vehicle, (vehicle) => vehicle.usedVehicles)
    vehicle: Vehicle;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("car")
export class Car {

    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    license_plate: string;

    @Column()
    color: string;

    @Column()
    brand: string;    

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("driver")
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
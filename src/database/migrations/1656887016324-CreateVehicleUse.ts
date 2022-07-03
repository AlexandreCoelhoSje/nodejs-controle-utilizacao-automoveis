import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateVehicleUse1656887016324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "vehicle_use",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "start_date",
                        type: "datetime"                   
                    },
                    {
                        name: "end_date",
                        type: "datetime"                   
                    },
                    {
                        name: "reason",
                        type: "varchar"
                    },                    
                    {
                        name: "driverId",
                        type: "integer"
                    },                    
                    {
                        name: "vehicleId",
                        type: "integer"
                    },                    
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKDriverVehicleUse",
                        referencedTableName: "driver",
                        referencedColumnNames: ["id"],
                        columnNames: ["driverId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKVehicleVehicleUse",
                        referencedTableName: "vehicle",
                        referencedColumnNames: ["id"],
                        columnNames: ["vehicleId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("vehicle_use");
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToOwnerTable1778667600000 implements MigrationInterface {
    name = "AddPasswordToOwnerTable1778667600000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" ADD "password" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "password"`);
    }
}

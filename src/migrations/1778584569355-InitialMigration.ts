import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1778584569355 implements MigrationInterface {
    name = 'InitialMigration1778584569355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "passports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "petId" uuid NOT NULL, "microchipNumber" character varying(100) NOT NULL, "issueDate" date NOT NULL, "color" character varying(50), "distinctiveMarks" character varying(255), "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bf662ca87d55da50df3d65566b0" UNIQUE ("petId"), CONSTRAINT "UQ_0a671776fae12a4cca9d094ccc1" UNIQUE ("microchipNumber"), CONSTRAINT "REL_bf662ca87d55da50df3d65566b" UNIQUE ("petId"), CONSTRAINT "PK_815eb61bea28dbd88b1a6b9207b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "species" character varying(50) NOT NULL, "breed" character varying(100), "dateOfBirth" date, "ownerId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20), "address" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email"), CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "passports" ADD CONSTRAINT "FK_bf662ca87d55da50df3d65566b0" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_275e1bb3fdeea68f8356d8e1ebb" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_275e1bb3fdeea68f8356d8e1ebb"`);
        await queryRunner.query(`ALTER TABLE "passports" DROP CONSTRAINT "FK_bf662ca87d55da50df3d65566b0"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TABLE "passports"`);
    }

}

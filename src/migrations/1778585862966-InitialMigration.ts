import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1778585862966 implements MigrationInterface {
    name = 'InitialMigration1778585862966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "microchip_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "microchipNo" character varying(100) NOT NULL, "isoStandard" character varying(50), "implantDate" date, "implantLocation" character varying(100), "vetClinicName" character varying(150), "petId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_069e421fe664b9c8170859e0e63" UNIQUE ("microchipNo"), CONSTRAINT "UQ_01f3dc5122a7007609ed07d902f" UNIQUE ("petId"), CONSTRAINT "REL_01f3dc5122a7007609ed07d902" UNIQUE ("petId"), CONSTRAINT "PK_2d90cf63cf8c60b19207dd37b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veterinary_clinics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clinicName" character varying(150) NOT NULL, "veterinarianName" character varying(150) NOT NULL, "licenseNo" character varying(100), "address" text, "contact" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ce86e0888aae13bb04bc1168e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vaccineCategory" character varying(50) NOT NULL, "vaccineName" character varying(150) NOT NULL, "batchNo" character varying(100), "dateGiven" date NOT NULL, "validUntilNextDue" date, "petId" uuid NOT NULL, "vetId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_99719c8d5726027cd5f7a7cbb1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recordType" character varying(50) NOT NULL, "date" date NOT NULL, "details" jsonb, "petId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c200c0b76638124b7ed51424823" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "colorMarkings" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "gender" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "dob" date`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "sterilized" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "fullName" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "passportNic" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "country" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "mobile" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "emergencyContactName" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "emergencyContactPhone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "microchip_records" ADD CONSTRAINT "FK_01f3dc5122a7007609ed07d902f" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccinations" ADD CONSTRAINT "FK_f4595ce99f215adb46f88dbaadf" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccinations" ADD CONSTRAINT "FK_fcc1511284ce7d90621385be0dd" FOREIGN KEY ("vetId") REFERENCES "veterinary_clinics"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_e5a90668d638f333ad8cb7cdfdc" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_e5a90668d638f333ad8cb7cdfdc"`);
        await queryRunner.query(`ALTER TABLE "vaccinations" DROP CONSTRAINT "FK_fcc1511284ce7d90621385be0dd"`);
        await queryRunner.query(`ALTER TABLE "vaccinations" DROP CONSTRAINT "FK_f4595ce99f215adb46f88dbaadf"`);
        await queryRunner.query(`ALTER TABLE "microchip_records" DROP CONSTRAINT "FK_01f3dc5122a7007609ed07d902f"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "emergencyContactPhone"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "emergencyContactName"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "passportNic"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "sterilized"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "colorMarkings"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "lastName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "firstName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "dateOfBirth" date`);
        await queryRunner.query(`DROP TABLE "medical_records"`);
        await queryRunner.query(`DROP TABLE "vaccinations"`);
        await queryRunner.query(`DROP TABLE "veterinary_clinics"`);
        await queryRunner.query(`DROP TABLE "microchip_records"`);
    }

}

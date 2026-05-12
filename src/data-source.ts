import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { Owner } from "./entities/Owner";
import { Pet } from "./entities/Pet";
import { MicrochipRecord } from "./entities/MicrochipRecord";
import { VeterinaryClinic } from "./entities/VeterinaryClinic";
import { Vaccination } from "./entities/Vaccination";
import { MedicalRecord } from "./entities/MedicalRecord";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false, // Disabled to use migrations
    logging: true,
    entities: [Owner, Pet, MicrochipRecord, VeterinaryClinic, Vaccination, MedicalRecord],
    subscribers: [],
    migrations: ["src/migrations/*.ts"],
    ssl: process.env.DATABASE_URL?.includes("localhost") ? false : {
        rejectUnauthorized: false
    }
});

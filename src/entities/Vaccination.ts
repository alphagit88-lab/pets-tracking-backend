import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Pet } from "./Pet";
import { VeterinaryClinic } from "./VeterinaryClinic";

@Entity("vaccinations")
export class Vaccination {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 50 })
    vaccineCategory!: string; // Rabies/Core/Additional

    @Column({ type: "varchar", length: 150 })
    vaccineName!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    batchNo!: string;

    @Column({ type: "date" })
    dateGiven!: Date;

    @Column({ type: "date", nullable: true })
    validUntilNextDue!: Date;

    @Column({ type: "uuid" })
    petId!: string;

    @ManyToOne(() => Pet, (pet) => pet.vaccinations, { onDelete: "CASCADE" })
    @JoinColumn({ name: "petId" })
    pet!: Pet;

    @Column({ type: "uuid", nullable: true })
    vetId!: string;

    @ManyToOne(() => VeterinaryClinic, (clinic) => clinic.vaccinations, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "vetId" })
    veterinaryClinic!: VeterinaryClinic;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

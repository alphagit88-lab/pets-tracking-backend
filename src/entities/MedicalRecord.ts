import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Pet } from "./Pet";

@Entity("medical_records")
export class MedicalRecord {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 50 })
    recordType!: string; // Test/Deworming/Surgery/Treatment

    @Column({ type: "date" })
    date!: Date;

    @Column({ type: "jsonb", nullable: true })
    details!: any;

    @Column({ type: "uuid" })
    petId!: string;

    @ManyToOne(() => Pet, (pet) => pet.medicalRecords, { onDelete: "CASCADE" })
    @JoinColumn({ name: "petId" })
    pet!: Pet;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

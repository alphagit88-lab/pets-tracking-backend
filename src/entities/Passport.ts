import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Pet } from "./Pet";

@Entity("passports")
export class Passport {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid", unique: true })
    petId!: string;

    @OneToOne(() => Pet, (pet) => pet.passport, { onDelete: "CASCADE" })
    @JoinColumn({ name: "petId" })
    pet!: Pet;

    @Column({ type: "varchar", length: 100, unique: true })
    microchipNumber!: string;

    @Column({ type: "date" })
    issueDate!: Date;

    @Column({ type: "varchar", length: 50, nullable: true })
    color!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    distinctiveMarks!: string;

    @Column({ type: "text", nullable: true })
    notes!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

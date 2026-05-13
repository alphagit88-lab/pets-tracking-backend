import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Index } from "typeorm";
import { Pet } from "./Pet";

@Entity("microchip_records")
export class MicrochipRecord {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "varchar", length: 100, unique: true })
    microchipNo!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    isoStandard!: string;

    @Column({ type: "date", nullable: true })
    implantDate!: Date;

    @Column({ type: "varchar", length: 100, nullable: true })
    implantLocation!: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    vetClinicName!: string;

    @Column({ type: "text", nullable: true })
    stickerUrl!: string;

    @Column({ type: "text", nullable: true })
    stickerImage!: string;

    @Column({ type: "uuid", unique: true })
    petId!: string;

    @OneToOne(() => Pet, (pet) => pet.microchipRecord, { onDelete: "CASCADE" })
    @JoinColumn({ name: "petId" })
    pet!: Pet;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

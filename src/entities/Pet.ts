import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Owner } from "./Owner";
import { MicrochipRecord } from "./MicrochipRecord";
import { Vaccination } from "./Vaccination";
import { MedicalRecord } from "./MedicalRecord";

@Entity("pets")
export class Pet {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 50 })
    species!: string; // Dog/Cat

    @Column({ type: "varchar", length: 100, nullable: true })
    breed!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    colorMarkings!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    gender!: string;

    @Column({ type: "date", nullable: true })
    dob!: Date;

    @Column({ type: "boolean", default: false })
    sterilized!: boolean;

    @Column({ type: "uuid" })
    ownerId!: string;

    @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: "CASCADE" })
    @JoinColumn({ name: "ownerId" })
    owner!: Owner;

    @OneToOne(() => MicrochipRecord, (microchip) => microchip.pet, { cascade: true, nullable: true })
    microchipRecord!: MicrochipRecord;

    @OneToMany(() => Vaccination, (vaccination) => vaccination.pet, { cascade: true })
    vaccinations!: Vaccination[];

    @OneToMany(() => MedicalRecord, (record) => record.pet, { cascade: true })
    medicalRecords!: MedicalRecord[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

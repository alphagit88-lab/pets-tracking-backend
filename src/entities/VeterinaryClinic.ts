import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Vaccination } from "./Vaccination";

@Entity("veterinary_clinics")
export class VeterinaryClinic {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 150 })
    clinicName!: string;

    @Column({ type: "varchar", length: 150 })
    veterinarianName!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    licenseNo!: string;

    @Column({ type: "text", nullable: true })
    address!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    contact!: string;

    @Column({ type: "text", nullable: true })
    sealUrl!: string;

    @Column({ type: "text", nullable: true })
    sealImage!: string;

    @OneToMany(() => Vaccination, (vaccination: Vaccination) => vaccination.veterinaryClinic)
    vaccinations!: Vaccination[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

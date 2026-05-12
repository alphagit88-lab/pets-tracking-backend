import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Pet } from "./Pet";

@Entity("owners")
export class Owner {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 150 })
    fullName!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    passportNic!: string;

    @Column({ type: "text", nullable: true })
    address!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    country!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    mobile!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    emergencyContactName!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    emergencyContactPhone!: string;

    @OneToMany(() => Pet, (pet) => pet.owner, { cascade: true })
    pets!: Pet[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

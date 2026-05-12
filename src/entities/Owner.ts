import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Pet } from "./Pet";

@Entity("owners")
export class Owner {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    firstName!: string;

    @Column({ type: "varchar", length: 100 })
    lastName!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone!: string;

    @Column({ type: "text", nullable: true })
    address!: string;

    @OneToMany(() => Pet, (pet) => pet.owner, { cascade: true })
    pets!: Pet[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

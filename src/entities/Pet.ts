import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Owner } from "./Owner";
import { Passport } from "./Passport";

@Entity("pets")
export class Pet {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 50 })
    species!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    breed!: string;

    @Column({ type: "date", nullable: true })
    dateOfBirth!: Date;

    @Column({ type: "uuid" })
    ownerId!: string;

    @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: "CASCADE" })
    @JoinColumn({ name: "ownerId" })
    owner!: Owner;

    @OneToOne(() => Passport, (passport) => passport.pet, { cascade: true, nullable: true })
    passport!: Passport;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

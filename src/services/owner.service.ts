import { AppDataSource } from "../data-source";
import { Owner } from "../entities/Owner";
import crypto from "crypto";

function hashPassword(secret: string): string {
    return crypto.createHash("sha256").update(secret).digest("hex");
}

export class OwnerService {
    private ownerRepository = AppDataSource.getRepository(Owner);

    async createOwner(payload: Partial<Owner>): Promise<Owner> {
        const existingOwner = await this.ownerRepository.findOneBy({ email: payload.email });
        if (existingOwner) {
            throw new Error("EMAIL_CONFLICT");
        }

        if (payload.password) {
            payload.password = hashPassword(payload.password);
        }

        const owner = this.ownerRepository.create(payload);
        return await this.ownerRepository.save(owner);
    }

    async getOwners(): Promise<Owner[]> {
        return await this.ownerRepository.find({
            relations: ["pets"],
            order: { createdAt: "DESC" }
        });
    }

    async getOwnerById(id: string): Promise<Owner | null> {
        return await this.ownerRepository.findOne({
            where: { id },
            relations: ["pets", "pets.microchipRecord", "pets.vaccinations", "pets.medicalRecords"]
        });
    }

    async updateOwner(id: string, payload: Partial<Owner>): Promise<Owner | null> {
        const owner = await this.ownerRepository.findOneBy({ id });
        if (!owner) return null;

        if (payload.email && payload.email !== owner.email) {
            const overlap = await this.ownerRepository.findOneBy({ email: payload.email });
            if (overlap) {
                throw new Error("EMAIL_CONFLICT");
            }
        }

        if (payload.password) {
            payload.password = hashPassword(payload.password);
        }

        this.ownerRepository.merge(owner, payload);
        return await this.ownerRepository.save(owner);
    }

    async loginOwner(email: string, passwordString?: string): Promise<Owner | null> {
        const owner = await this.ownerRepository.findOne({
            where: { email },
            relations: ["pets", "pets.microchipRecord", "pets.vaccinations", "pets.medicalRecords"]
        });

        if (!owner) return null;

        if (passwordString) {
            const hashedInput = hashPassword(passwordString);
            
            // If legacy account without password set, bind newly supplied password seamlessly
            if (!owner.password) {
                owner.password = hashedInput;
                await this.ownerRepository.save(owner);
                return owner;
            }

            // Verify input hash matches persistent record
            if (owner.password !== hashedInput) {
                return null;
            }
        }

        return owner;
    }

    async deleteOwner(id: string): Promise<boolean> {
        const owner = await this.ownerRepository.findOneBy({ id });
        if (!owner) return false;

        await this.ownerRepository.remove(owner);
        return true;
    }
}

import { AppDataSource } from "../data-source";
import { Owner } from "../entities/Owner";

export class OwnerService {
    private ownerRepository = AppDataSource.getRepository(Owner);

    async createOwner(payload: Partial<Owner>): Promise<Owner> {
        const existingOwner = await this.ownerRepository.findOneBy({ email: payload.email });
        if (existingOwner) {
            throw new Error("EMAIL_CONFLICT");
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

        this.ownerRepository.merge(owner, payload);
        return await this.ownerRepository.save(owner);
    }

    async deleteOwner(id: string): Promise<boolean> {
        const owner = await this.ownerRepository.findOneBy({ id });
        if (!owner) return false;

        await this.ownerRepository.remove(owner);
        return true;
    }
}

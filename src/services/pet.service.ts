import { AppDataSource } from "../data-source";
import { Pet } from "../entities/Pet";
import { Owner } from "../entities/Owner";

export class PetService {
    private petRepository = AppDataSource.getRepository(Pet);
    private ownerRepository = AppDataSource.getRepository(Owner);

    async createPet(ownerId: string, payload: Partial<Pet>): Promise<Pet> {
        const owner = await this.ownerRepository.findOneBy({ id: ownerId });
        if (!owner) {
            throw new Error("OWNER_NOT_FOUND");
        }

        const pet = this.petRepository.create({
            ...payload,
            ownerId
        });

        return await this.petRepository.save(pet);
    }

    async getPetsByOwner(ownerId: string): Promise<Pet[]> {
        const owner = await this.ownerRepository.findOneBy({ id: ownerId });
        if (!owner) {
            throw new Error("OWNER_NOT_FOUND");
        }

        return await this.petRepository.find({
            where: { ownerId },
            relations: ["owner", "microchipRecord", "vaccinations", "medicalRecords"],
            order: { createdAt: "DESC" }
        });
    }

    async getPetById(id: string): Promise<Pet | null> {
        return await this.petRepository.findOne({
            where: { id },
            relations: ["owner", "microchipRecord", "vaccinations", "vaccinations.veterinaryClinic", "medicalRecords"]
        });
    }

    async updatePet(id: string, payload: Partial<Pet>): Promise<Pet | null> {
        const pet = await this.petRepository.findOneBy({ id });
        if (!pet) return null;

        this.petRepository.merge(pet, payload);
        return await this.petRepository.save(pet);
    }

    async deletePet(id: string): Promise<boolean> {
        const pet = await this.petRepository.findOneBy({ id });
        if (!pet) return false;

        await this.petRepository.remove(pet);
        return true;
    }
}

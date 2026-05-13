import { AppDataSource } from "../data-source";
import { Owner } from "../entities/Owner";
import { Pet } from "../entities/Pet";
import { MicrochipRecord } from "../entities/MicrochipRecord";
import { VeterinaryClinic } from "../entities/VeterinaryClinic";
import { ILike } from "typeorm";

export class DashboardService {
    private ownerRepository = AppDataSource.getRepository(Owner);
    private petRepository = AppDataSource.getRepository(Pet);
    private microchipRepository = AppDataSource.getRepository(MicrochipRecord);
    private clinicRepository = AppDataSource.getRepository(VeterinaryClinic);

    async getStats(): Promise<any> {
        const totalOwners = await this.ownerRepository.count();
        const totalPets = await this.petRepository.count();
        const totalClinics = await this.clinicRepository.count();

        // Fetch 5 most recently registered pets with their owners for premium timeline overview
        const recentPets = await this.petRepository.find({
            order: { createdAt: "DESC" },
            take: 5,
            relations: ["owner", "microchipRecord"]
        });

        return {
            totalOwners,
            totalPets,
            totalClinics,
            recentPets
        };
    }

    async searchGlobally(queryString: string): Promise<any> {
        if (!queryString || queryString.trim() === "") {
            return {
                owners: [],
                pets: [],
                microchips: []
            };
        }

        const q = `%${queryString.trim()}%`;

        const owners = await this.ownerRepository.find({
            where: [
                { fullName: ILike(q) },
                { email: ILike(q) },
                { mobile: ILike(q) }
            ],
            take: 10
        });

        const pets = await this.petRepository.find({
            where: [
                { name: ILike(q) },
                { breed: ILike(q) }
            ],
            relations: ["owner", "microchipRecord"],
            take: 10
        });

        const microchips = await this.microchipRepository.find({
            where: { microchipNo: ILike(q) },
            relations: ["pet", "pet.owner"],
            take: 10
        });

        return {
            owners,
            pets,
            microchips
        };
    }
}

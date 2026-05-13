import { AppDataSource } from "../data-source";
import { MicrochipRecord } from "../entities/MicrochipRecord";
import { VeterinaryClinic } from "../entities/VeterinaryClinic";
import { Vaccination } from "../entities/Vaccination";
import { MedicalRecord } from "../entities/MedicalRecord";
import { Pet } from "../entities/Pet";

export class ClinicalService {
    private microchipRepo = AppDataSource.getRepository(MicrochipRecord);
    private clinicRepo = AppDataSource.getRepository(VeterinaryClinic);
    private vaccinationRepo = AppDataSource.getRepository(Vaccination);
    private medicalRepo = AppDataSource.getRepository(MedicalRecord);
    private petRepo = AppDataSource.getRepository(Pet);

    // --- Microchip Operations ---
    async upsertMicrochip(petId: string, payload: Partial<MicrochipRecord>): Promise<MicrochipRecord> {
        const pet = await this.petRepo.findOneBy({ id: petId });
        if (!pet) throw new Error("PET_NOT_FOUND");

        // Check global microchip uniqueness if changing or new
        const existingNo = await this.microchipRepo.findOneBy({ microchipNo: payload.microchipNo });
        if (existingNo && existingNo.petId !== petId) {
            throw new Error("MICROCHIP_CONFLICT");
        }

        let record = await this.microchipRepo.findOneBy({ petId });
        if (record) {
            this.microchipRepo.merge(record, payload);
        } else {
            record = this.microchipRepo.create({ ...payload, petId });
        }
        return await this.microchipRepo.save(record);
    }

    async getMicrochipByPet(petId: string): Promise<MicrochipRecord | null> {
        return await this.microchipRepo.findOneBy({ petId });
    }

    async deleteMicrochip(petId: string): Promise<boolean> {
        const record = await this.microchipRepo.findOneBy({ petId });
        if (!record) return false;
        await this.microchipRepo.remove(record);
        return true;
    }

    // --- Veterinary Clinic Registry ---
    async createClinic(payload: Partial<VeterinaryClinic>): Promise<VeterinaryClinic> {
        const clinic = this.clinicRepo.create(payload);
        return await this.clinicRepo.save(clinic);
    }

    async getClinics(): Promise<VeterinaryClinic[]> {
        return await this.clinicRepo.find({ order: { clinicName: "ASC" } });
    }

    async getClinicById(id: string): Promise<VeterinaryClinic | null> {
        return await this.clinicRepo.findOne({
            where: { id },
            relations: ["vaccinations"]
        });
    }

    async updateClinic(id: string, payload: Partial<VeterinaryClinic>): Promise<VeterinaryClinic | null> {
        const clinic = await this.clinicRepo.findOneBy({ id });
        if (!clinic) return null;
        this.clinicRepo.merge(clinic, payload);
        return await this.clinicRepo.save(clinic);
    }

    async deleteClinic(id: string): Promise<boolean> {
        const clinic = await this.clinicRepo.findOneBy({ id });
        if (!clinic) return false;
        await this.clinicRepo.remove(clinic);
        return true;
    }

    // --- Vaccination Tracking ---
    async addVaccination(petId: string, payload: Partial<Vaccination>): Promise<Vaccination> {
        const pet = await this.petRepo.findOneBy({ id: petId });
        if (!pet) throw new Error("PET_NOT_FOUND");

        if (payload.vetId) {
            const clinic = await this.clinicRepo.findOneBy({ id: payload.vetId });
            if (!clinic) throw new Error("CLINIC_NOT_FOUND");
        }

        const vac = this.vaccinationRepo.create({ ...payload, petId });
        return await this.vaccinationRepo.save(vac);
    }

    async getVaccinationsByPet(petId: string): Promise<Vaccination[]> {
        return await this.vaccinationRepo.find({
            where: { petId },
            relations: ["veterinaryClinic"],
            order: { dateGiven: "DESC" }
        });
    }

    async deleteVaccination(id: string): Promise<boolean> {
        const vac = await this.vaccinationRepo.findOneBy({ id });
        if (!vac) return false;
        await this.vaccinationRepo.remove(vac);
        return true;
    }

    // --- Medical Records (JSONB dynamic payload) ---
    async addMedicalRecord(petId: string, payload: Partial<MedicalRecord>): Promise<MedicalRecord> {
        const pet = await this.petRepo.findOneBy({ id: petId });
        if (!pet) throw new Error("PET_NOT_FOUND");

        const record = this.medicalRepo.create({ ...payload, petId });
        return await this.medicalRepo.save(record);
    }

    async getMedicalRecordsByPet(petId: string): Promise<MedicalRecord[]> {
        return await this.medicalRepo.find({
            where: { petId },
            order: { date: "DESC" }
        });
    }

    async deleteMedicalRecord(id: string): Promise<boolean> {
        const record = await this.medicalRepo.findOneBy({ id });
        if (!record) return false;
        await this.medicalRepo.remove(record);
        return true;
    }
}

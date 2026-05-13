import { Request, Response } from "express";
import { ClinicalService } from "../services/clinical.service";

export class ClinicalController {
    private clinicalService = new ClinicalService();

    // --- Microchip Endpoints ---
    upsertMicrochip = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const record = await this.clinicalService.upsertMicrochip(petId as string, req.body);
            return res.status(200).json(record);
        } catch (error: any) {
            if (error.message === "PET_NOT_FOUND") return res.status(404).json({ error: "Targeted pet profile not found." });
            if (error.message === "MICROCHIP_CONFLICT") return res.status(409).json({ error: "Microchip number already registered to another pet." });
            console.error("Error saving microchip:", error);
            return res.status(500).json({ error: "Internal server error saving microchip data." });
        }
    };

    getMicrochipByPet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const record = await this.clinicalService.getMicrochipByPet(petId as string);
            if (!record) return res.status(404).json({ error: "No microchip record found for this pet." });
            return res.json(record);
        } catch (error) {
            console.error("Error fetching microchip:", error);
            return res.status(500).json({ error: "Internal server error fetching microchip." });
        }
    };

    deleteMicrochip = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const success = await this.clinicalService.deleteMicrochip(petId as string);
            if (!success) return res.status(404).json({ error: "Microchip record not found." });
            return res.json({ message: "Microchip data removed successfully." });
        } catch (error) {
            console.error("Error deleting microchip:", error);
            return res.status(500).json({ error: "Internal server error removing microchip." });
        }
    };

    // --- Veterinary Clinic Registry Endpoints ---
    createClinic = async (req: Request, res: Response): Promise<any> => {
        try {
            const clinic = await this.clinicalService.createClinic(req.body);
            return res.status(201).json(clinic);
        } catch (error) {
            console.error("Error creating clinic:", error);
            return res.status(500).json({ error: "Internal server error registering clinic." });
        }
    };

    getClinics = async (req: Request, res: Response): Promise<any> => {
        try {
            const clinics = await this.clinicalService.getClinics();
            return res.json(clinics);
        } catch (error) {
            console.error("Error fetching clinics:", error);
            return res.status(500).json({ error: "Internal server error fetching clinics list." });
        }
    };

    getClinicById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const clinic = await this.clinicalService.getClinicById(id as string);
            if (!clinic) return res.status(404).json({ error: "Clinic profile not found." });
            return res.json(clinic);
        } catch (error) {
            console.error("Error fetching clinic by id:", error);
            return res.status(500).json({ error: "Internal server error fetching targeted clinic." });
        }
    };

    updateClinic = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const clinic = await this.clinicalService.updateClinic(id as string, req.body);
            if (!clinic) return res.status(404).json({ error: "Clinic profile not found." });
            return res.json(clinic);
        } catch (error) {
            console.error("Error updating clinic:", error);
            return res.status(500).json({ error: "Internal server error updating clinic attributes." });
        }
    };

    deleteClinic = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const success = await this.clinicalService.deleteClinic(id as string);
            if (!success) return res.status(404).json({ error: "Clinic profile not found." });
            return res.json({ message: "Clinic profile deleted successfully." });
        } catch (error) {
            console.error("Error deleting clinic:", error);
            return res.status(500).json({ error: "Internal server error deleting clinic." });
        }
    };

    // --- Vaccination Endpoints ---
    addVaccination = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const vac = await this.clinicalService.addVaccination(petId as string, req.body);
            return res.status(201).json(vac);
        } catch (error: any) {
            if (error.message === "PET_NOT_FOUND") return res.status(404).json({ error: "Targeted pet profile not found." });
            if (error.message === "CLINIC_NOT_FOUND") return res.status(404).json({ error: "Targeted veterinary clinic not found." });
            console.error("Error logging vaccination:", error);
            return res.status(500).json({ error: "Internal server error adding vaccination entry." });
        }
    };

    getVaccinationsByPet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const vacs = await this.clinicalService.getVaccinationsByPet(petId as string);
            return res.json(vacs);
        } catch (error) {
            console.error("Error fetching vaccinations:", error);
            return res.status(500).json({ error: "Internal server error fetching timeline." });
        }
    };

    deleteVaccination = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const success = await this.clinicalService.deleteVaccination(id as string);
            if (!success) return res.status(404).json({ error: "Vaccination entry not found." });
            return res.json({ message: "Vaccination log removed successfully." });
        } catch (error) {
            console.error("Error deleting vaccination:", error);
            return res.status(500).json({ error: "Internal server error removing log." });
        }
    };

    // --- Medical Record Endpoints ---
    addMedicalRecord = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const record = await this.clinicalService.addMedicalRecord(petId as string, req.body);
            return res.status(201).json(record);
        } catch (error: any) {
            if (error.message === "PET_NOT_FOUND") return res.status(404).json({ error: "Targeted pet profile not found." });
            console.error("Error saving medical record:", error);
            return res.status(500).json({ error: "Internal server error storing medical log." });
        }
    };

    getMedicalRecordsByPet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { petId } = req.params;
            const records = await this.clinicalService.getMedicalRecordsByPet(petId as string);
            return res.json(records);
        } catch (error) {
            console.error("Error fetching medical records:", error);
            return res.status(500).json({ error: "Internal server error fetching clinical history." });
        }
    };

    deleteMedicalRecord = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const success = await this.clinicalService.deleteMedicalRecord(id as string);
            if (!success) return res.status(404).json({ error: "Medical record entry not found." });
            return res.json({ message: "Medical record log removed successfully." });
        } catch (error) {
            console.error("Error deleting medical record:", error);
            return res.status(500).json({ error: "Internal server error deleting record." });
        }
    };
}

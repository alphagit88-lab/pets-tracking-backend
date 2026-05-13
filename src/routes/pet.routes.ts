import { Router } from "express";
import { PetController } from "../controllers/pet.controller";
import { ClinicalController } from "../controllers/clinical.controller";
import { validatePetUpdate } from "../middlewares/validatePet.middleware";
import { validateMicrochip, validateVaccination, validateMedicalRecord } from "../middlewares/validateClinical.middleware";

const router = Router();
const petController = new PetController();
const clinicalController = new ClinicalController();

// --- Nested Digital Passport / Microchip ---
router.post("/:petId/microchip", validateMicrochip, clinicalController.upsertMicrochip);
router.get("/:petId/microchip", clinicalController.getMicrochipByPet);
router.delete("/:petId/microchip", clinicalController.deleteMicrochip);

// --- Nested Vaccination History ---
router.post("/:petId/vaccinations", validateVaccination, clinicalController.addVaccination);
router.get("/:petId/vaccinations", clinicalController.getVaccinationsByPet);

// --- Nested Medical Treatments ---
router.post("/:petId/medical-records", validateMedicalRecord, clinicalController.addMedicalRecord);
router.get("/:petId/medical-records", clinicalController.getMedicalRecordsByPet);

// --- Core Pet ID details (placed last to prevent greedy matching) ---
router.get("/:id", petController.getPetById);
router.put("/:id", validatePetUpdate, petController.updatePet);
router.delete("/:id", petController.deletePet);

export default router;

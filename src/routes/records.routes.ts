import { Router } from "express";
import { ClinicalController } from "../controllers/clinical.controller";
import { validateVaccination } from "../middlewares/validateClinical.middleware";

const router = Router();
const clinicalController = new ClinicalController();

// Top-level sub-resource specific modifications and deletions
router.put("/vaccinations/:id", validateVaccination, clinicalController.updateVaccination);
router.delete("/vaccinations/:id", clinicalController.deleteVaccination);
router.delete("/medical-records/:id", clinicalController.deleteMedicalRecord);

export default router;

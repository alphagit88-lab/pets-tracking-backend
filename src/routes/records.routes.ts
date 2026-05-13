import { Router } from "express";
import { ClinicalController } from "../controllers/clinical.controller";

const router = Router();
const clinicalController = new ClinicalController();

// Top-level sub-resource specific deletions
router.delete("/vaccinations/:id", clinicalController.deleteVaccination);
router.delete("/medical-records/:id", clinicalController.deleteMedicalRecord);

export default router;

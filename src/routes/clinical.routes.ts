import { Router } from "express";
import { ClinicalController } from "../controllers/clinical.controller";
import { validateClinic } from "../middlewares/validateClinical.middleware";

const router = Router();
console.log("Initializing clinical.routes.ts absolute router mappings...");
const clinicalController = new ClinicalController();

// --- Top-level standalone Veterinary Clinics Registry (mounted globally without prefix stripping) ---
router.post("/api/clinics", validateClinic, clinicalController.createClinic);
router.get("/api/clinics", clinicalController.getClinics);
router.get("/api/clinics/:id", clinicalController.getClinicById);
router.put("/api/clinics/:id", validateClinic, clinicalController.updateClinic);
router.delete("/api/clinics/:id", clinicalController.deleteClinic);

export default router;

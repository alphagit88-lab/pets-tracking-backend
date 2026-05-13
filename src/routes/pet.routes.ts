import { Router } from "express";
import { PetController } from "../controllers/pet.controller";
import { validatePetUpdate } from "../middlewares/validatePet.middleware";

const router = Router();
const petController = new PetController();

router.get("/:id", petController.getPetById);
router.put("/:id", validatePetUpdate, petController.updatePet);
router.delete("/:id", petController.deletePet);

export default router;

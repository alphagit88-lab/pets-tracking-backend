import { Router } from "express";
import { OwnerController } from "../controllers/owner.controller";
import { PetController } from "../controllers/pet.controller";
import { validateOwnerCreation, validateOwnerUpdate } from "../middlewares/validateOwner.middleware";
import { validatePetCreation } from "../middlewares/validatePet.middleware";

const router = Router();
const ownerController = new OwnerController();
const petController = new PetController();

// Owner standard CRUD
router.post("/", validateOwnerCreation, ownerController.createOwner);
router.get("/", ownerController.getOwners);
router.get("/:id", ownerController.getOwnerById);
router.put("/:id", validateOwnerUpdate, ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);

// Nested Pet endpoints under specific Owner
router.post("/:ownerId/pets", validatePetCreation, petController.createPet);
router.get("/:ownerId/pets", petController.getPetsByOwner);

export default router;

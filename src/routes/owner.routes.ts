import { Router } from "express";
import { OwnerController } from "../controllers/owner.controller";
import { PetController } from "../controllers/pet.controller";
import { validateOwnerCreation, validateOwnerUpdate } from "../middlewares/validateOwner.middleware";
import { validatePetCreation } from "../middlewares/validatePet.middleware";

const router = Router();
const ownerController = new OwnerController();
const petController = new PetController();

// Nested Pet endpoints under specific Owner (placed first for accurate route matching)
router.post("/:ownerId/pets", validatePetCreation, petController.createPet);
router.get("/:ownerId/pets", petController.getPetsByOwner);

// Owner standard CRUD
router.post("/login", ownerController.loginOwner);
router.post("/restore", ownerController.restoreOwnerSession);
router.post("/", validateOwnerCreation, ownerController.createOwner);
router.get("/", ownerController.getOwners);
router.get("/:id", ownerController.getOwnerById);
router.put("/:id", validateOwnerUpdate, ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);

export default router;

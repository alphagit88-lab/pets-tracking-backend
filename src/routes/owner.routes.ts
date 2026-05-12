import { Router } from "express";
import { OwnerController } from "../controllers/owner.controller";
import { validateOwnerCreation, validateOwnerUpdate } from "../middlewares/validateOwner.middleware";

const router = Router();
const ownerController = new OwnerController();

router.post("/", validateOwnerCreation, ownerController.createOwner);
router.get("/", ownerController.getOwners);
router.get("/:id", ownerController.getOwnerById);
router.put("/:id", validateOwnerUpdate, ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);

export default router;

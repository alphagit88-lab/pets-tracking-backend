import { Request, Response } from "express";
import { PetService } from "../services/pet.service";

export class PetController {
    private petService = new PetService();

    // POST /api/owners/:ownerId/pets
    createPet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { ownerId } = req.params;
            const pet = await this.petService.createPet(ownerId as string, req.body);
            return res.status(201).json(pet);
        } catch (error: any) {
            if (error.message === "OWNER_NOT_FOUND") {
                return res.status(404).json({ error: "Targeted owner profile not found." });
            }
            console.error("Error creating pet:", error);
            return res.status(500).json({ error: "Internal server error while registering pet." });
        }
    };

    // GET /api/owners/:ownerId/pets
    getPetsByOwner = async (req: Request, res: Response): Promise<any> => {
        try {
            const { ownerId } = req.params;
            const pets = await this.petService.getPetsByOwner(ownerId as string);
            return res.json(pets);
        } catch (error: any) {
            if (error.message === "OWNER_NOT_FOUND") {
                return res.status(404).json({ error: "Targeted owner profile not found." });
            }
            console.error("Error fetching owner pets:", error);
            return res.status(500).json({ error: "Internal server error while fetching pets list." });
        }
    };

    // GET /api/pets/:id
    getPetById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const pet = await this.petService.getPetById(id as string);

            if (!pet) {
                return res.status(404).json({ error: "Pet record not found." });
            }

            return res.json(pet);
        } catch (error) {
            console.error("Error fetching pet by id:", error);
            return res.status(500).json({ error: "Internal server error while fetching targeted pet." });
        }
    };

    // PUT /api/pets/:id
    updatePet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const pet = await this.petService.updatePet(id as string, req.body);

            if (!pet) {
                return res.status(404).json({ error: "Pet record not found." });
            }

            return res.json(pet);
        } catch (error) {
            console.error("Error updating pet:", error);
            return res.status(500).json({ error: "Internal server error while updating pet details." });
        }
    };

    // DELETE /api/pets/:id
    deletePet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const success = await this.petService.deletePet(id as string);

            if (!success) {
                return res.status(404).json({ error: "Pet record not found." });
            }

            return res.json({ message: "Pet record deleted successfully." });
        } catch (error) {
            console.error("Error deleting pet:", error);
            return res.status(500).json({ error: "Internal server error while removing pet profile." });
        }
    };
}

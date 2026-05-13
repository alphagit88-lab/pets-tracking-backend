import { Request, Response } from "express";
import { OwnerService } from "../services/owner.service";

export class OwnerController {
    private ownerService = new OwnerService();

    // POST /api/owners
    createOwner = async (req: Request, res: Response): Promise<any> => {
        try {
            const owner = await this.ownerService.createOwner(req.body);
            return res.status(201).json(owner);
        } catch (error: any) {
            if (error.message === "EMAIL_CONFLICT") {
                return res.status(409).json({ error: "An owner with this email already exists." });
            }
            console.error("Error creating owner:", error);
            return res.status(500).json({ error: "Internal server error while creating owner." });
        }
    };

    // GET /api/owners
    getOwners = async (req: Request, res: Response): Promise<any> => {
        try {
            const owners = await this.ownerService.getOwners();
            return res.json(owners);
        } catch (error) {
            console.error("Error fetching owners:", error);
            return res.status(500).json({ error: "Internal server error while fetching owners." });
        }
    };

    // GET /api/owners/:id
    getOwnerById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const owner = await this.ownerService.getOwnerById(id as string);

            if (!owner) {
                return res.status(404).json({ error: "Owner not found." });
            }

            return res.json(owner);
        } catch (error) {
            console.error("Error fetching owner by id:", error);
            return res.status(500).json({ error: "Internal server error while fetching owner." });
        }
    };

    // PUT /api/owners/:id
    updateOwner = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const owner = await this.ownerService.updateOwner(id as string, req.body);

            if (!owner) {
                return res.status(404).json({ error: "Owner not found." });
            }

            return res.json(owner);
        } catch (error: any) {
            if (error.message === "EMAIL_CONFLICT") {
                return res.status(409).json({ error: "Email is already in use by another owner." });
            }
            console.error("Error updating owner:", error);
            return res.status(500).json({ error: "Internal server error while updating owner." });
        }
    };

    // POST /api/owners/login
    loginOwner = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, password } = req.body;
            if (!email) return res.status(400).json({ error: "Email signature parameter required for validation." });
            if (!password) return res.status(400).json({ error: "Password access token required for authorization." });
            
            const owner = await this.ownerService.loginOwner(email, password);
            if (!owner) return res.status(401).json({ error: "Invalid email or password access payload matching this guardian ID." });
            
            return res.json(owner);
        } catch (error) {
            console.error("Error logging in owner:", error);
            return res.status(500).json({ error: "Internal server error parsing authentication state." });
        }
    };

    // DELETE /api/owners/:id
    deleteOwner = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const success = await this.ownerService.deleteOwner(id as string);

            if (!success) {
                return res.status(404).json({ error: "Owner not found." });
            }

            return res.json({ message: "Owner deleted successfully." });
        } catch (error) {
            console.error("Error deleting owner:", error);
            return res.status(500).json({ error: "Internal server error while deleting owner." });
        }
    };
}

import { Request, Response, NextFunction } from "express";

export const validatePetCreation = (req: Request, res: Response, next: NextFunction): any => {
    const { name, species } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Field 'name' is strictly required and must be a non-empty string." });
    }

    if (!species || typeof species !== "string" || species.trim() === "") {
        return res.status(400).json({ error: "Field 'species' is strictly required (e.g., 'Dog' or 'Cat')." });
    }

    next();
};

export const validatePetUpdate = (req: Request, res: Response, next: NextFunction): any => {
    const { name, species } = req.body;

    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
        return res.status(400).json({ error: "Provided 'name' must be a non-empty string." });
    }

    if (species !== undefined && (typeof species !== "string" || species.trim() === "")) {
        return res.status(400).json({ error: "Provided 'species' must be a non-empty string." });
    }

    next();
};

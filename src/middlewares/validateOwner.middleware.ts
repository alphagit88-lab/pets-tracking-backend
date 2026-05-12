import { Request, Response, NextFunction } from "express";

export const validateOwnerCreation = (req: Request, res: Response, next: NextFunction): any => {
    const { fullName, email } = req.body;

    if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
        return res.status(400).json({ error: "Field 'fullName' is strictly required and must be a non-empty string." });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Field 'email' is strictly required and must be a valid email address." });
    }

    next();
};

export const validateOwnerUpdate = (req: Request, res: Response, next: NextFunction): any => {
    const { email } = req.body;

    if (email !== undefined && (typeof email !== "string" || !email.includes("@"))) {
        return res.status(400).json({ error: "Provided 'email' must be a valid email address." });
    }

    next();
};

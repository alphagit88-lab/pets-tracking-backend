import { Request, Response, NextFunction } from "express";

export const validateMicrochip = (req: Request, res: Response, next: NextFunction): any => {
    const { microchipNo } = req.body;
    if (!microchipNo || typeof microchipNo !== "string" || microchipNo.trim() === "") {
        return res.status(400).json({ error: "Field 'microchipNo' is strictly required." });
    }
    next();
};

export const validateClinic = (req: Request, res: Response, next: NextFunction): any => {
    const { clinicName, veterinarianName } = req.body;
    if (!clinicName || typeof clinicName !== "string" || clinicName.trim() === "") {
        return res.status(400).json({ error: "Field 'clinicName' is strictly required." });
    }
    if (!veterinarianName || typeof veterinarianName !== "string" || veterinarianName.trim() === "") {
        return res.status(400).json({ error: "Field 'veterinarianName' is strictly required." });
    }
    next();
};

export const validateVaccination = (req: Request, res: Response, next: NextFunction): any => {
    const { vaccineCategory, vaccineName, dateGiven } = req.body;
    if (!vaccineCategory || typeof vaccineCategory !== "string" || vaccineCategory.trim() === "") {
        return res.status(400).json({ error: "Field 'vaccineCategory' is required (e.g. Rabies/Core/Additional)." });
    }
    if (!vaccineName || typeof vaccineName !== "string" || vaccineName.trim() === "") {
        return res.status(400).json({ error: "Field 'vaccineName' is required." });
    }
    if (!dateGiven) {
        return res.status(400).json({ error: "Field 'dateGiven' is required." });
    }
    next();
};

export const validateMedicalRecord = (req: Request, res: Response, next: NextFunction): any => {
    const { recordType, date } = req.body;
    if (!recordType || typeof recordType !== "string" || recordType.trim() === "") {
        return res.status(400).json({ error: "Field 'recordType' is required (e.g. Test/Surgery/Treatment)." });
    }
    if (!date) {
        return res.status(400).json({ error: "Field 'date' is required." });
    }
    next();
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: 524288000 })); // 500MB explicitly as numeric bytes
app.use(express.urlencoded({ limit: 524288000, extended: true, parameterLimit: 1000000 }));

import ownerRoutes from "./routes/owner.routes";
import petRoutes from "./routes/pet.routes";
import recordsRoutes from "./routes/records.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { ClinicalController } from "./controllers/clinical.controller";
import { validateClinic } from "./middlewares/validateClinical.middleware";

// Basic health check route - triggering fresh live dev process restart
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Pet Tracking API is running." });
});

const clinicalController = new ClinicalController();

// Top-level standalone Veterinary Clinics Registry
app.post("/api/clinics", validateClinic, clinicalController.createClinic);
app.get("/api/clinics", clinicalController.getClinics);
app.get("/api/clinics/:id", clinicalController.getClinicById);
app.put("/api/clinics/:id", validateClinic, clinicalController.updateClinic);
app.delete("/api/clinics/:id", clinicalController.deleteClinic);

app.use("/api/owners", ownerRoutes);
app.use("/api/pets", petRoutes);
app.use("/api", recordsRoutes);
app.use("/api", dashboardRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("TypeORM connection error: ", error));

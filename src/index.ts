import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Pet Tracking API is running." });
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("TypeORM connection error: ", error));

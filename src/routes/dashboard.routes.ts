import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";

const router = Router();
const dashboardController = new DashboardController();

// Dashboard Summary Stats
router.get("/stats", dashboardController.getStats);

// Cross-entity Global Search
router.get("/search", dashboardController.searchGlobally);

export default router;

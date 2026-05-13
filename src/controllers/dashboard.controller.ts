import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
    private dashboardService = new DashboardService();

    getStats = async (req: Request, res: Response): Promise<any> => {
        try {
            const stats = await this.dashboardService.getStats();
            return res.json(stats);
        } catch (error) {
            console.error("Error fetching dashboard statistics:", error);
            return res.status(500).json({ error: "Internal server error retrieving metrics." });
        }
    };

    searchGlobally = async (req: Request, res: Response): Promise<any> => {
        try {
            const { q } = req.query;
            const results = await this.dashboardService.searchGlobally((q as string) || "");
            return res.json(results);
        } catch (error) {
            console.error("Error executing global search:", error);
            return res.status(500).json({ error: "Internal server error executing multi-entity search." });
        }
    };
}

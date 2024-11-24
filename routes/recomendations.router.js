import Router from "express";
import RecomendationsController from "../controllers/recomendations.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

//Router de Recomendaciones
router.get("/comparation/:userId", verifyToken, RecomendationsController.RecomendationComparation); // Recomendaciones de comparación de gasto
router.get("/tendency/:userId", verifyToken, RecomendationsController.RecomendationTendency); // Recomendaciones de tendencia de gasto

export default router;


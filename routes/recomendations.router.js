import Router from "express";
import RecomendationsController from "../controllers/recomendations.controller.js";

const router = Router();

//Router de Auth
router.post("/comparation/:userId", RecomendationsController.RecomendationComparation); // Recomendaciones de comparación de gasto
router.post("/tendency/:userId", RecomendationsController.RecomendationTendency); // Recomendaciones de tendencia de gasto

export default router;


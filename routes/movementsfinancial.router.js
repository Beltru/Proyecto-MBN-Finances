import Router from "express";
import movementsFinancialController from "../controllers/movementsfinancial.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Router de Movimientos Financieros
router.get("/balance", verifyToken, movementsFinancialController.getTotalBalance); // Devuelve el saldo total
router.get("/incomes/monthly", verifyToken, movementsFinancialController.getMonthlyIncomes); // Devuelve ingresos mensuales
router.get("/expenses/monthly", verifyToken, movementsFinancialController.getMonthlyExpenses); // Devuelve egresos mensuales
router.get("/balance/monthly", verifyToken, movementsFinancialController.getMonthlyBalance); // Devuelve saldo mensual
router.get("/incomes/daily", verifyToken, movementsFinancialController.getDailyIncomes); // Devuelve ingresos diarios
router.get("/expenses/daily", verifyToken, movementsFinancialController.getDailyExpenses); // Devuelve egresos diarios
router.get("/balance/daily", verifyToken, movementsFinancialController.getDailyBalance); // Devuelve saldo diario

export default router;

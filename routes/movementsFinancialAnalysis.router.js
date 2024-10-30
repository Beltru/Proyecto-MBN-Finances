import Router from 'express';
import MovementsFinancialAnalysisController from '../controllers/movementsFinancialAnalysis.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas para el análisis financiero de movimientos
router.get('/incomes/date/:userId', verifyToken, MovementsFinancialAnalysisController.getIncomesByDate); // Obtener ingresos por fecha
router.get('/expenses/date/:userId', verifyToken, MovementsFinancialAnalysisController.getExpensesByDate); // Obtener egresos por fecha
router.get('/balance/date/:userId', verifyToken, MovementsFinancialAnalysisController.getBalanceByDate); // Obtener saldo por fecha
router.get('/incomes/month/:userId', verifyToken, MovementsFinancialAnalysisController.getIncomesByMonth); // Obtener ingresos por mes
router.get('/expenses/month/:userId', verifyToken, MovementsFinancialAnalysisController.getExpensesByMonth); // Obtener egresos por mes
router.get('/balance/month/:userId', verifyToken, MovementsFinancialAnalysisController.getBalanceByMonth); // Obtener saldo por mes

export default router;

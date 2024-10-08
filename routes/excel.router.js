import Router from "express";
import ExcelController from "../controllers/excel.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

//Router de Movimientos Financieros
router.post("/upload/:userId", verifyToken, ExcelController.getMovements); //Get todos los Movimientos por Id de Usuario

export default router;

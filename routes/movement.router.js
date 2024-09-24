import Router from "express";
import MovementsController from "controllers/movements.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

//Router de Movimientos Financieros
router.get("/:userId", verifyToken(), MovementsController.getMovements); //Get todos los Movimientos por Id de Usuario
router.get("/:id", verifyToken(), MovementsController.getMovement); //Get Movimiento por ID
router.post("/", verifyToken(), MovementsController.createMovement); //Crear Movimiento por ID
router.put("/:id", verifyToken(), MovementsController.updateMovement); //Actualizar Movimiento por ID
router.delete("/:id", verifyToken(), MovementsController.deleteMovement); //Borrar Movimiento por ID

export default router;

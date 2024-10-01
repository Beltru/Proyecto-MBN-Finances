import Router from "express";
import MovementsController from "../controllers/movements.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

//Router de Movimientos Financieros
router.get("/:userId", verifyToken, MovementsController.getMovements); //Get todos los Movimientos por Id de Usuario
router.get("/:id", verifyToken, MovementsController.getMovementById); //Get Movimiento por ID
router.get("/:userId", verifyToken, MovementsController.getMovementsByUser); //Get Movimiento por UserId
router.post("/:userId", verifyToken, MovementsController.uploadMovements); //Crear Movimiento por ID
router.post("/create/:userId", verifyToken, MovementsController.createMovement); //Crear Movimiento por ID
router.put("/:id", verifyToken, MovementsController.updateMovement); //Actualizar Movimiento por ID
router.delete("/:id", verifyToken, MovementsController.deleteMovement); //Borrar Movimiento por ID

export default router;

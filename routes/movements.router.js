import Router from "express";
import MovementsController from "../controllers/movements.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Router de Movimientos Financieros
router.get("/", verifyToken, verifyAdmin, MovementsController.getMovements) //Devuelve todos los movimientos financieros
router.get("/user/:userId", verifyToken, MovementsController.getMovementsByUser); // Obtener todos los Movimientos por userId
router.get("/movement/:id", verifyToken, MovementsController.getMovementById); // Obtener Movimiento por ID
router.get("/all/:userId", verifyToken, MovementsController.getMovements); // Obtener Movimiento por userId
router.post("/upload/:userId", verifyToken, MovementsController.uploadMovements); // Subir Movimiento por userId
router.post("/create/:userId", verifyToken, MovementsController.createMovement); // Crear Movimiento por userId
router.put("/update/:id", verifyToken, MovementsController.updateMovement); // Actualizar Movimiento por ID
router.delete("/delete/:id", verifyToken, MovementsController.deleteMovement); // Borrar Movimiento por ID

export default router;

import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

//Router de Auth
router.post("/register", AuthController.register); //Registro
router.post("/login", AuthController.login); //Login
router.get("/user/email/:email", AuthController.getUserByEmail);
router.put("/user/email/:email", AuthController.updateUserByEmail);

export default router;


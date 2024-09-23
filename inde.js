import AuthRouter from "./routes/auth.router.js";
import express from "express";
const port = 3000;

// Importar los controladores
import users from "./controllers/users.js";
import movements from "./controllers/movements.js";

const app = express();

app.use(express.json());
app.use(cors());

//
app.get("/ ", (req, res) => (
    res.send("Node JS api"))
);

// Rutas de usuarios
app.get("/users", verifyToken(), verifyAdmin(), users.getUsers);
app.get("/users/:id", verifyToken(), users.getUser);
app.post("/users", users.createUser);
app.put("/users/:id", verifyToken(), users.updateUser);
app.delete("/users/:id", verifyToken(), users.deleteUser);

// Rutas de movimientos financieros
app.get("/movements/:userId", verifyToken(), movements.getMovements);
app.get("/movements/:id", verifyToken(), movements.getMovement);
app.post("/movements", verifyToken(), movements.createMovement);
app.put("/movements/:id", verifyToken(), movements.updateMovement);
app.delete("/movements/:id", verifyToken(), movements.deleteMovement);

//
app.use("/auth", AuthRouter);

// 
app.listen (port, () => {
    console.log(`Api is listening at http://localhost: ${port}`);
});
import express from "express";
const app = express();
const port = 3000;

// Importar los controladores
import users from "./controllers/users.js";
import movements from "./controllers/movements.js";

// midleaqres
app.use(express.json());

//
app.get("/ ", (req, res) => (
    res.send("Node JS api"))
);

// Rutas de usuarios
app.get("/users", users.getUsers);
app.get("/users/:id", users.getUser);
app.post("/users", users.createUser);
app.put("/users/:id", users.updateUser);
app.delete("/users/:id", users.deleteUser);

// Rutas de movimientos financieros
app.get("/movements/:userId", movements.getMovements);
app.get("/movements/:id", movements.getMovement);
app.post("/movements", movements.createMovement);
app.put("/movements/:id", movements.updateMovement);
app.delete("/movements/:id", movements.deleteMovement);

// 
app.listen (port, () => {
    console.log(`Api is listening at http://localhost: ${port}`);
});
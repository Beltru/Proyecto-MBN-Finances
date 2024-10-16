import express from "express"; //Express

import MovementsRouter from "./routes/movements.router.js"; //Router Movimientos Financieros
import AuthRouter from "./routes/auth.router.js"; //Router de Registro

import cors from "cors";
import "dotenv/config";

const port = 9000; //Declara el Puerto 9000
const app = express();

app.use(express.json());
app.use(cors());

app.get("/ ", (req, res) => ( res.send("Node JS api")));

app.use("/movements", MovementsRouter);
app.use("/auth", AuthRouter);

app.listen (port, () => {
    console.log(`Api is listening at http://localhost: ${port}`);
});


import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const xlsx = require('xlsx'); // Importa la biblioteca xlsx para manejar archivos Excel

const processFile = async (id) => {
    const client = new Client(config);
    await client.connect();
    
    try{
        await client.query(
            "DELETE FROM movimientos_financieros WHERE id_movimiento = $1", 
            [id]
        );

        await client.end();
        return rows;
    } catch(error) {
        await client.end();
        throw error;
    }
};

export default {
    processFile,
};
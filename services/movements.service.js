import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;


const getMovements = async (userId) => {
    const client = new Client(config);
    await client.connect();
    
    try{
        const { rows } = await client.query("SELECT * FROM movimientos_financieros WHERE id_usuario = $1", [userId]);
        
        await client.end();
        return rows;
    } catch(error) {
        await client.end();
        throw error;
    } 
};

const getMovementsByUser = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try{
        const { rows } = await client.query(
            "SELECT * FROM movimientos_financieros WHERE id_usuario = $1", 
            [userId]
        );    
        await client.end();
        return rows;
    } catch(error) {
        await client.end();
        throw error;
    }
};

const getMovementById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try{
        const { rows } = await client.query(
            "SELECT * FROM movimientos_financieros WHERE id_movimiento = $1", 
            [id]
        );    
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch(error) {
        await client.end();
        throw error;
    }
};

const uploadMovements = async (userID, movements_exel) => {
    try{
        //Aca deberia usar el movements_exel lo abriria converitria cada uno de los -
        //registros en filas de la base de datos


        res.status(200)
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

const createMovement = async (userId, fecha, categoria, monto, descripcion) => {
    const client = new Client(config);
    await client.connect();
    
    try{
        const {rows} = await client.query(
            "INSERT INTO movimientos_financieros (id_usuario, fecha, categoria, monto, descripcion) VALUES ($1, $2, $3, $4, $5)", 
            [userId, fecha, categoria, monto, descripcion]
        );

        await client.end();
        return rows;
    } catch(error) {
        await client.end();
        throw error;
    }
};

const updateMovement = async (id, fecha, categoria, monto, descripcion) => {
    const client = new Client(config);
    await client.connect();

    try{
        const {rows} = await client.query(
            "UPDATE movimientos_financieros SET fecha = $1, categoria = $2, monto = $3, descripcion = $4 WHERE id_movimiento = $5", 
            [fecha, categoria, monto, descripcion, id]
        );

        await client.end();
        return rows;
    } catch(error) {
        await client.end();
        throw error;
    }
};

const deleteMovement = async (id) => {
    const client = new Client(config);
    await client.connect();
    
    try{
        const [rows] = await client.query(
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
    getMovements,
    getMovementsByUser,
    getMovementById,
    uploadMovements,
    createMovement,
    updateMovement,
    deleteMovement,
};
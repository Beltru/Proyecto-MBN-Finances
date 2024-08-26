import { client } from "../db.js";

const getMovements = async (userId) => {
    return await client.query("SELECT * FROM movimientos_financieros WHERE id_usuario = $1", [userId]);
};

const getMovement = async (id) => {
    return await client.query("SELECT * FROM movimientos_financieros WHERE id_movimiento = $1", [id]);
};

const createMovement = async (userId, fecha, categoria, monto, descripcion) => {
    await client.query("INSERT INTO movimientos_financieros (id_usuario, fecha, categoria, monto, descripcion) VALUES ($1, $2, $3, $4, $5)", 
        [userId, fecha, categoria, monto, descripcion]);
};

const updateMovement = async (id, fecha, categoria, monto, descripcion) => {
    await client.query("UPDATE movimientos_financieros SET fecha = $1, categoria = $2, monto = $3, descripcion = $4 WHERE id_movimiento = $5", 
        [fecha, categoria, monto, descripcion, id]);
};

const deleteMovement = async (id) => {
    await client.query("DELETE FROM movimientos_financieros WHERE id_movimiento = $1", [id]);
};

export default {
    getMovements,
    getMovement,
    createMovement,
    updateMovement,
    deleteMovement,
};
import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const getUsuarioByEmail = async (email) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getUsuarioById = async (id) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;
        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const createUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, admin) VALUES ($1, $2, $3, $4, false)",
            [usuario.nombre, usuario.apellido, usuario.email, usuario.password]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const updateUsuario = async (email, updatedData) => {
    const client = new Client(config);
    await client.connect();
    const { nombre, apellido } = updatedData;

    try{
        console.log("Datos a actualizar:", { email, nombre, apellido }); // Verificar valores
        const { rows } = await client.query("UPDATE usuarios SET nombre = $1, apellido = $2 WHERE email = $3", [nombre, apellido, email])
        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error
    }
};


export default { getUsuarioByEmail, getUsuarioById, createUsuario, updateUsuario };

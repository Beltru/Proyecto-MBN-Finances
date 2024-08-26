import { client } from "../db.js";

const getUsers = async () => {
    return await client.query("SELECT * FROM usuarios");
};

const getUser = async (id) => {
    return await client.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
};

const createUser = async (nombre, correo, contraseña) => {
    await client.query("INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3)", [nombre, correo, contraseña]);
};

const updateUser = async (id, nombre, correo) => {
    await client.query("UPDATE usuarios SET nombre = $1, correo = $2 WHERE id_usuario = $3", [nombre, correo, id]);
};

const deleteUser = async (id) => {
    await client.query("DELETE FROM usuarios WHERE id_usuario = $1", [id]);
};

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
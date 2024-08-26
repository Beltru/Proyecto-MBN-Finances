import userService from "../services/user.service.js";

const getUsers = async (req, res) => {
    const result = await userService.getUsers();
    res.json(result.rows);
};

const getUser = async (req, res) => {
    const id = req.params.id;
    const result = await userService.getUser(id);
    res.json(result.rows);
};

const createUser = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    await userService.createUser(nombre, correo, contraseña);
    res.send("Usuario creado correctamente.");
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombre, correo } = req.body;
    await userService.updateUser(id, nombre, correo);
    res.send("Usuario actualizado correctamente.");
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.send("Usuario eliminado correctamente.");
};

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
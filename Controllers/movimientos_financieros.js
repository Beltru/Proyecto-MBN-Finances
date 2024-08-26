import movementService from "../services/movement.service.js";

const getMovements = async (req, res) => {
    const userId = req.params.userId;
    const result = await movementService.getMovements(userId);
    res.json(result.rows);
};

const getMovement = async (req, res) => {
    const id = req.params.id;
    const result = await movementService.getMovement(id);
    res.json(result.rows);
};

const createMovement = async (req, res) => {
    const { userId, fecha, categoria, monto, descripcion } = req.body;
    await movementService.createMovement(userId, fecha, categoria, monto, descripcion);
    res.send("Movimiento creado correctamente.");
};

const updateMovement = async (req, res) => {
    const id = req.params.id;
    const { fecha, categoria, monto, descripcion } = req.body;
    await movementService.updateMovement(id, fecha, categoria, monto, descripcion);
    res.send("Movimiento actualizado correctamente.");
};

const deleteMovement = async (req, res) => {
    const id = req.params.id;
    await movementService.deleteMovement(id);
    res.send("Movimiento eliminado correctamente.");
};

export default {
    getMovements,
    getMovement,
    createMovement,
    updateMovement,
    deleteMovement,
};
//Se importan las funciones de movements.service, para poder usarlas desde los controllers.
import movementService from "../services/movements.service.js";

//Devuelve todos los movimientos financieros atravez de userId.
const getMovements = async (req, res) => {
    const userId = req.id;
    
    if (!userId) {
        return res.status(400).json({message: "Se requiere userId."}); }

    try{
        const result = await movementService.getMovements(userId);
        res.status(200).json(result.rows);
    } catch (error){
        res.status(500).json({message: error.message});
    }  
};


//Devuelve un movimiento financiero atravez del id del movimiento financiero.
const getMovementsByUser = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({message: "Se requiere userId"}); }

    try{
        const result = await movementService.getMovementByUser(userId);
        if (!result){
            return res.status(404).json({message: "Movimiento no encontrado"});}

        res.status(200).json(result.rows);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

//Devuelve un movimiento financiero atravez del id del movimiento financiero.
const getMovementById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({message: "Se requiere id del movimiento financiero"}); }

    try{
        const result = await movementService.getMovementById(id);
        if (!result){
            return res.status(404).json({message: "Movimiento no encontrado"});}

        res.status(200).json(result.rows);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

/*

Falta hacer e upload Movements, terminarlo a logica del controller y de los services

*/
const uploadMovements = async (req, res) => {
    const userId = req.id;
    const movements_exel = req.body;

    if (!userId){
        return res.status(400).json({message: "Se requiere userId"}); }

    if (!movements_exel){
        return res.status(400).json({message: "Se requiere movements_exel"}); }
        
    try{
        const result = await movementService.uploadMovements(userId, movements_exel);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Crea un solo movimiento financiero
const createMovement = async (req, res) => {
    const userId = req.id;
    const { fecha, categoria, monto, descripcion } = req.body;

    if (!userId){
        return res.status(400).json({message: "Se necesita un userId"}); }

    if (!fecha){
        return res.status(400).json({message: "Se necesita fecha"}); }
    
    if (!categoria){
        return res.status(400).json({message: "Se necesita una categoria"}); }

    if (!monto){
        return res.status(400).json({message: "Se necesita un monto"}); }

    if (!descripcion){
        return res.status(400).json({message: "Se necesita una descripcion"}); }

    try{
        await movementService.createMovement(userId, fecha, categoria, monto, descripcion);
        res.status(201).json({message: "Movimiento creado correctamente."});
    } catch(error){
        res.status(500).json({message: "Error al crear el Movmiento", error});
    }
};

const updateMovement = async (req, res) => {
    const id = req.params.id;
    const { fecha, categoria, monto, descripcion } = req.body;

    if (!id){
        return res.status(400).json({message: "Se necesita el id del movmiento financiero"}); }

    if (!userId){
        return res.status(400).json({message: "Se necesita un userId"}); }

    if (!fecha){
        return res.status(400).json({message: "Se necesita fecha"}); }
    
    if (!categoria){
        return res.status(400).json({message: "Se necesita una categoria"}); }

    //Ingresar cada una de las categorias posibles
    /* 
    if (categoria != "" || categoria != "" || categoria != "" || categoria != "" || categoria != "" ||categoria != "" || categoria != "" ){
        return res.status(400).json({message: "Se necesita una categoria valida, $(categoria), no es valido"}); }
    */

    if (!monto){
        return res.status(400).json({message: "Se necesita un monto"}); }

    if (!descripcion){
        return res.status(400).json({message: "Se necesita una descripcion"}); }

    try{
        const movement = await movementService.getMovementById(id);

        if (!movement) {
            return res.status(404).json({ message: "movement no encontrado" }); 
        }

        await movementService.updateMovement(id, fecha, categoria, monto, descripcion);

        res.status(200).json({message: "Movimiento actualizado correctamente."});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const deleteMovement = async (req, res) => {
    const id = req.params.id;

    if (!id){
        return res.status(400).json({message: "Se necesita el id del movmiento financiero"}); }
    
    try{
        const movement = await movementService.getMovementById(id);

        if (!movement) {
            return res.status(404).json({ message: "movement no encontrado" }); 
        }

        await movementService.deleteMovement(id);
        
        res.status(200).json({message: "Movimiento eliminado correctamente."});
    } catch(error){
        res.status(500).json({message: error.message});
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
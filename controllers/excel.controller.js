//Se importan las funciones de excel.service, para poder usarlas desde los controllers.
import movementService from "../services/excel.service.js";

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

export default {
    getMovements,
    getMovementsByUser,
    getMovementById,
    uploadMovements,
    createMovement,
    updateMovement,
    deleteMovement,
};
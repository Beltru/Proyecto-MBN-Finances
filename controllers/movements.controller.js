//Se importan las funciones de movements.service, para poder usarlas desde los controllers.
import movementService from "../services/movements.service.js";

//Devuelve todos los movimientos financieros atravez de userId.
const getMovements = async (req, res) => {
    const userId = req.id;
    
    if (!userId) {
        return res.status(400).json({message: "Se requiere userId."}); }

    try{
        const rows = await movementService.getMovements(userId)
        if(!rows){
            return res.status(404).json({message: "Movimientos no encontrados"});
        }
        res.status(200).json({rows});
    } catch (error){
        res.status(500).json({message: error.message});
    }  
};


//Devuelve todos los movimientos financieros de un usuario
const getMovementsByUser = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({message: "Se requiere userId"}); }

    try{
        const rows = await movementService.getMovementsByUser(userId);
        if (!rows){
            return res.status(404).json({message: "Movimientos no encontrados"});
        }
        res.status(200).json({rows});
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
        const rows = await movementService.getMovementById(id);
        if (!rows){
            return res.status(404).json({message: "Movimiento no encontrado"});
        }
        res.status(200).json({rows});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

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
    
    const PosibleCategories = 
    [
        "Vivienda",
        "Transporte",
        "Alimentación",
        "Salud y bienestar",
        "Ropa y calzado",
        "Educación",
        "Entretenimiento",
        "Tecnología",
        "Otros"
    ];
    
    if (!PosibleCategories.includes(categoria)) {
        return res.status(400).json({message: "Se necesita Ingresar una categoria Valida"});
    }
    
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

function convertirFecha(fecha) {
    // Dividimos la fecha usando el separador "/"
    const partes = fecha.split("/");

    // Reorganizamos las partes al formato YYYY/MM/DD
    const fechaConvertida = `${partes[2]}/${partes[1]}/${partes[0]}`;

    return fechaConvertida;
}

const uploadMovements = async (req, res) => {
    const userId = req.id;
    
    if (!req.file) {
        return res.status(400).send('No se proporcionó ningún archivo CSV.');
    }

    try {
        // Lee el archivo CSV desde la memoria
        const csvData = req.file.buffer.toString('utf-8');

        // Divide el contenido en filas (cada línea del CSV)
        const filas = csvData.split('\n');

        // Recorre cada fila y muestra su contenido
        filas.forEach((fila, index) => {
            if (index > 0 && index < filas.length-2)
            {
                //console.log("hola");
                const campos = fila.split(';');

                const fecha = convertirFecha(campos[0]);
                const categoria = "Vivienda";
                const monto = parseInt(campos[3].replace('.', '').replace(',', '.'), 10);
                
                const descripcion = campos[1];

                if (!userId){
                    return res.status(400).json({message: "Se necesita un userId"}); }
            
                if (!fecha){
                    return res.status(400).json({message: "Se necesita fecha"}); }
                
                if (!categoria){
                    return res.status(400).json({message: "Se necesita una categoria"}); }
                
                const PosibleCategories = 
                [
                    "Vivienda",
                    "Transporte",
                    "Alimentación",
                    "Salud y bienestar",
                    "Ropa y calzado",
                    "Educación",
                    "Entretenimiento",
                    "Tecnología",
                    "Otros"
                ];
                
                if (!PosibleCategories.includes(categoria)) {
                    return res.status(400).json({message: "Se necesita Ingresar una categoria Valida"});
                }
                
                if (!monto){
                    return res.status(400).json({message: "Se necesita un monto"}); }
            
                if (!descripcion){
                    return res.status(400).json({message: "Se necesita una descripcion"}); }
                
                //console.log("userId: " + userId + "fecha: "+ fecha + "categoria: "+categoria + "monto: "+monto + "descripcion: "+descripcion);
                try{
                    //console.log("userId: " + userId + "fecha: "+ fecha + "categoria: "+categoria + "monto: "+monto + "descripcion: "+descripcion);
                    movementService.createMovement(userId, fecha, categoria, monto, descripcion);
                } catch(error){
                    res.status(500).json({message: "Error al crear el Movmiento", error});
                }
            }
        });

        // Envía una respuesta indicando que se recibió correctamente el archivo
        res.status(200).send('Los movimientos fueron creados exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un problema al procesar el archivo CSV');
    }
};

const updateMovement = async (req, res) => {
    const id = req.params.id;
    const { fecha, categoria, monto, descripcion } = req.body;

    if (!id){
        return res.status(400).json({message: "Se necesita el id del movmiento financiero"}); }

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

        const deletedRows = await movementService.deleteMovement(id);
        
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
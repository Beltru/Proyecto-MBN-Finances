import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {

    try{
        if(!req.headers.authorization)
            return res.status(401).json({message: "No puede acceder."});

        const token = req.headers.authorization.split(" ")[1];

        if (!token) 
            return res.status(400).json({message: "Formato invalido de token."});

        const payload = await jwt.verify(token, "secret");
        //console.log(payload);

        if (!payload.id) 
            return res.status(400).json({ message: "El token no contiene un ID de usuario."});
    
        req.id = parseInt(payload.id);

        //console.log(req.id);

        next();

    } catch (error){
        res.status(500).json({message: error.message || 'Error Autentificacion'});
    }
};

export const verifyAdmin = async (req, res, next) => {

    const idUsuario = req.id; 

    try {
        const usuario = await UsuariosService.getUsuarioById(idUsuario);

        if (!usuario.admin) 
            return res.status(403).json({ message: "Acceso denegado. No eres administrador." });

        next();
    
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

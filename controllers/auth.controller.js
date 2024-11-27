import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { nombre, email, password } = req.body;
    let apellido = "hola"
    let usuario = {
        nombre,
        email,
        apellido,
        password
    }
    const saltRounds = 10;
    
   if (!usuario)
        return res.status(400).json({ message: "Se requiere un usuario." }); 

    if (!nombre || !email || !password)
        return res.status(400).json({ message: "Todos los campos deben de encontrase llenos." });

    try {
        const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);

        if (usuarioExistente)
            return res.status(400).json({ message: "Ya existe un usuario con este mail." });

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash); 

        usuario.password = hash;

        await UsuariosService.createUsuario(usuario);
        res.status(201).json({ message: "Usuario creado con éxito." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) 
        return res.status(400).json({ message: "Se necesita un email y una contraseña." });

    try {  

        const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);

        if (!usuarioExistente)
            return res.status(404).json({ message: "Usuario con email no encontrado." });

        const match = await bcrypt.compare(password, usuarioExistente.password);

        if (!match)
            return res.status(400).json({ message: message.error });

        const token = await jwt.sign({ id: usuarioExistente.id }, "secret", { expiresIn: "30m" });
        return res.status(200).json({ usuario: {
            id: usuarioExistente.id,
            email: usuarioExistente.email,
            nombre: usuarioExistente.nombre,
            apellido: usuarioExistente.apellido,
            admin: usuarioExistente.admin,
        }, token });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { register, login };

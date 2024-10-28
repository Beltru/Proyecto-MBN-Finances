import multer from 'multer';

// Configura multer para almacenar los archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

console.log(upload);

// Middleware para manejar la subida de un solo archivo con el campo 'file'
export const uploadFile = async (req, res, next) => {
    try {
        // Utiliza multer para procesar la subida del archivo
        const uploadSingle = upload.single('file');

        uploadSingle(req, res, (err) => {
            if (err) {
                // Error al subir el archivo
                return res.status(400).json({ message: 'Error al subir el archivo: ' + err.message }); }

            // Verifica si el archivo ha sido subido
            if (!req.file) {
                return res.status(400).json({ message: 'No se ha subido ningún archivo.' }); }

            next();
        });

    } catch (error) {
        // Maneja cualquier error inesperado
        res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud: ' + error.message });
    }
};
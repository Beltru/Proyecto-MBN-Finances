import multer from 'multer';

// Configura multer para almacenar los archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB, ajusta según sea necesario
    fileFilter: (req, file, cb) => {
        // Solo aceptar archivos .xlsx
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no soportado. Solo se permiten archivos .xlsx.'));
        }
    }
});

// Middleware para manejar la subida de un solo archivo con el campo 'file'
export const uploadFile = async (req, res, next) => {
    try {
        // Utiliza multer para procesar la subida del archivo
        const uploadSingle = upload.single('file');

        uploadSingle(req, res, (err) => {
            if (err) {
                // Error al subir el archivo
                return res.status(400).json({ message: 'Error al subir el archivo: ' + err.message });
            }

            // Verifica si el archivo ha sido subido
            if (!req.file) {
                return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
            }

            // Si todo está bien, pasa al siguiente middleware
            next();
        });

    } catch (error) {
        // Maneja cualquier error inesperado
        res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud: ' + error.message });
    }
};

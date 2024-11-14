const multer = require('multer');

// Configuración de multer para almacenar el archivo temporalmente en la memoria
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // Verifica que el archivo sea un CSV
        if (file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos CSV'), false);
        }
    }
});

module.exports = upload;
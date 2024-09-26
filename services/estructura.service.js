import express from 'express';
import { client } from './db.js'; // Importa tu cliente de conexión

const router = express.Router();

// Endpoint para obtener todas las columnas de la tabla 'usuarios'
router.get('/usuarios/columns', async (req, res) => {
    try {
        const result = await client.query(`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'usuarios';
        `);
        res.json(result.rows); // Devuelve las columnas en formato JSON
    } catch (error) {
        console.error('Error al obtener las columnas:', error);
        res.status(500).json({ message: 'Error al obtener columnas' });
    }
});

export default router;


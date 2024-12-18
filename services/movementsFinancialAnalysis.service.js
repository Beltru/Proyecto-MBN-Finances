import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

// Obtener ingresos por un día específico
const getIncomesByDate = async (userId, date) => {
    const client = new Client(config);
    await client.connect();
    //console.log(date);
    try {
        const { rows } = await client.query(
            "SELECT SUM(monto) AS total_ingreso FROM movimientos_financieros WHERE id_usuario = $1 AND monto < 0 AND fecha = $2::DATE;",            
            [userId, date]
        );

        await client.end();
        return rows[0].total_ingreso *-1 || 0; // Retorna 0 si no hay ingresos
    } catch (error) {
        await client.end();
        throw error;
    }
};

// Obtener egresos por un día específico
const getExpensesByDate = async (userId, date) => {
    const client = new Client(config);
    await client.connect();
    console.log(date);
    try {
        
        const { rows } = await client.query(
            "SELECT SUM(monto) AS total_egreso FROM movimientos_financieros WHERE id_usuario = $1 AND monto > 0 AND fecha = $2::DATE;",            
            [userId, date]
        );
        
        await client.end();
        return rows[0].total_egreso || 0; // Retorna 0 si no hay egresos
    } catch (error) {
        await client.end();
        throw error;
    }
};

// Obtener saldo por un día específico
const getBalanceByDate = async (userId, date) => {
    const ingresos = await getIncomesByDate(userId, date);
    const egresos = await getExpensesByDate(userId, date);
    return ingresos - egresos; // Retorna el saldo del día
};

// Obtener ingresos por mes específico
const getIncomesByMonth = async (userId, month) => {
    const client = new Client(config);
    await client.connect();

    try {
        console.log(month)
        const { rows } = await client.query(
            "SELECT SUM(monto) AS total_ingreso FROM movimientos_financieros WHERE id_usuario = $2 AND monto < 0 AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM $1::DATE) AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM $1::DATE)",
            [month, userId]
        );

        await client.end();
        return rows[0].total_ingreso *-1 || 0; // Retorna 0 si no hay ingresos
    } catch (error) {
        await client.end();
        throw error;
    }
};

// Obtener egresos por mes específico
const getExpensesByMonth = async (userId, month) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "SELECT SUM(monto) AS total_egreso FROM movimientos_financieros WHERE id_usuario = $2 AND monto > 0 AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM $1::DATE) AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM $1::DATE)",
            [month, userId]
        );
        
        

        await client.end();
        return rows[0].total_egreso || 0; // Retorna 0 si no hay egresos
    } catch (error) {
        await client.end();
        throw error;
    }
};

// Obtener saldo por mes específico
const getBalanceByMonth = async (userId, month) => {
    const ingresos = await getIncomesByMonth(userId, month);
    const egresos = await getExpensesByMonth(userId, month);
    return ingresos - egresos; // Retorna el saldo del mes
};

export default {
    getIncomesByDate,
    getExpensesByDate,
    getBalanceByDate,
    getIncomesByMonth,
    getExpensesByMonth,
    getBalanceByMonth,
};

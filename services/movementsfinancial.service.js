import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;


const getTotalBalance = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT SUM(monto) FROM movimientos_financieros WHERE id_usuario = $1;",
            [userId]
        );

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getMonthlyIncomes = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT DATE_TRUNC('month', fecha) AS mes, SUM(monto) AS total_ingreso FROM movimientos_financieros WHERE id_usuario = $1 AND monto > 0 GROUP BY mes ORDER BY mes;",
            [userId]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getMonthlyExpenses = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT DATE_TRUNC('month', fecha) AS mes, SUM(monto) AS total_ingreso FROM movimientos_financieros WHERE id_usuario = $1 AND monto < 0 GROUP BY mes ORDER BY mes;",
            [userId]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getMonthlyBalance = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT DATE_TRUNC('month', fecha) AS mes, SUM(CASE WHEN monto > 0 THEN monto ELSE -monto END) AS saldo_mensual FROM movimientos_financieros WHERE id_usuario = $1 GROUP BY mes ORDER BY mes;",
            [userId]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getDailyIncomes = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT DATE(fecha) AS dia, SUM(monto) AS total_ingreso FROM movimientos_financieros WHERE id_usuario = $1 AND tipo = 'ingreso' GROUP BY dia ORDER BY dia",
            [userId]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getDailyExpenses = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT DATE(fecha) AS dia, SUM(monto) AS total_egreso FROM movimientos_financieros WHERE id_usuario = $1 AND tipo = 'egreso' GROUP BY dia ORDER BY dia",
            [userId]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getDailyBalance = async (userId) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT DATE(fecha) AS dia, SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE -monto END) OVER (ORDER BY fecha) AS saldo_diario FROM movimientos_financieros WHERE id_usuario = $1 ORDER BY dia",
            [userId]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

export default {
    getTotalBalance,
    getMonthlyIncomes,
    getMonthlyExpenses,
    getMonthlyBalance,
    getDailyIncomes,
    getDailyExpenses,
    getDailyBalance,
};

import movementsFinancialService from "../services/movementsfinancial.service.js";

const getTotalBalance = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const balance = await movementsFinancialService.getTotalBalance(userId);
        if (balance === null) {
            return res.status(404).json({ message: "Saldo total no encontrado" });
        }
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyIncomes = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const incomes = await movementsFinancialService.getMonthlyIncomes(userId);
        res.status(200).json({ incomes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyExpenses = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const expenses = await movementsFinancialService.getMonthlyExpenses(userId);
        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyBalance = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const balance = await movementsFinancialService.getMonthlyBalance(userId);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDailyIncomes = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const incomes = await movementsFinancialService.getDailyIncomes(userId);
        res.status(200).json({ incomes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDailyExpenses = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const expenses = await movementsFinancialService.getDailyExpenses(userId);
        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDailyBalance = async (req, res) => {
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const balance = await movementsFinancialService.getDailyBalance(userId);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

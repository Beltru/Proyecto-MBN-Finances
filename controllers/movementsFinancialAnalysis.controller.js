import MovementsFinancialAnalysisService from '../services/movementsFinancialAnalysis.service.js';

const getIncomesByDate = async (req, res) => {
    const userId = req.id;
    const date = req.params.date; // Se asume que la fecha se pasa como parámetro de consulta

    console.log(userId);
    console.log(date);

    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    if (!date){
        return res.json(400).json({ message: "Se requiere un date "});
    }

    try {
        const DayIncomes = await MovementsFinancialAnalysisService.getIncomesByDate(userId, date);
        res.json({ DayIncomes });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ingresos por fecha', error });
    }
};

const getExpensesByDate = async (req, res) => {
    const { userId } = req.params;
    const { date } = req.query;

    try {
        const totalExpenses = await MovementsFinancialAnalysisService.getExpensesByDate(userId, date);
        res.json({ totalExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los egresos por fecha', error });
    }
};

const getBalanceByDate = async (req, res) => {
    const { userId } = req.params;
    const { date } = req.query;

    try {
        const balance = await MovementsFinancialAnalysisService.getBalanceByDate(userId, date);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el saldo por fecha', error });
    }
};

const getIncomesByMonth = async (req, res) => {
    const { userId } = req.params;
    const { month } = req.query; // Se asume que el mes se pasa como parámetro de consulta

    try {
        const totalIncomes = await MovementsFinancialAnalysisService.getIncomesByMonth(userId, month);
        res.json({ totalIncomes });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ingresos por mes', error });
    }
};

const getExpensesByMonth = async (req, res) => {
    const { userId } = req.params;
    const { month } = req.query;

    try {
        const totalExpenses = await MovementsFinancialAnalysisService.getExpensesByMonth(userId, month);
        res.json({ totalExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los egresos por mes', error });
    }
};

const getBalanceByMonth = async (req, res) => {
    const { userId } = req.params;
    const { month } = req.query;

    try {
        const balance = await MovementsFinancialAnalysisService.getBalanceByMonth(userId, month);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el saldo por mes', error });
    }
};

export default {
    getIncomesByDate,
    getExpensesByDate,
    getBalanceByDate,
    getIncomesByMonth,
    getExpensesByMonth,
    getBalanceByMonth,
};

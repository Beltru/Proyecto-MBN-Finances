import MovementsFinancialAnalysisService from '../services/movementsFinancialAnalysis.service.js';

const getIncomesByDate = async (req, res) => {
    const userId = req.id;
    const date = req.query.date; // Se asume que la fecha se pasa como parámetro de consulta

    console.log(userId);
    console.log(date);
    
    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    if (!date){
        return res.status(400).json({ message: "Se requiere un date "});
    }

    if (isNaN(Date.parse(date)))
    {
        return res.status(400).json({ message: "Se requiere que tenga el formato adecuado"});
    }

    try {
        const DayIncomes = await MovementsFinancialAnalysisService.getIncomesByDate(userId, date);
        res.status(200).json({ DayIncomes });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ingresos por fecha', error });
    }
};

const getExpensesByDate = async (req, res) => {
    const { userId } = req.params;
    const { date } = req.query;

    try {
        const DayExpenses = await MovementsFinancialAnalysisService.getExpensesByDate(userId, date);
        res.json({ DayExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los egresos por fecha', error });
    }
};

const getBalanceByDate = async (req, res) => {
    const { userId } = req.params;
    const { date } = req.query;

    try {
        const DayBalance = await MovementsFinancialAnalysisService.getBalanceByDate(userId, date);
        res.json({ DayBalance });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el saldo por fecha', error });
    }
};

const getIncomesByMonth = async (req, res) => {
    const { userId } = req.params;
    const { month } = req.query; // Se asume que el mes se pasa como parámetro de consulta

    try {
        const MonthIncomes = await MovementsFinancialAnalysisService.getIncomesByMonth(userId, month);
        res.json({ MonthIncomes });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ingresos por mes', error });
    }
};

const getExpensesByMonth = async (req, res) => {
    const { userId } = req.params;
    const { month } = req.query;

    try {
        const MonthExpenses = await MovementsFinancialAnalysisService.getExpensesByMonth(userId, month);
        res.json({ MonthExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los egresos por mes', error });
    }
};

const getBalanceByMonth = async (req, res) => {
    const { userId } = req.params;
    const { month } = req.query;

    try {
        const MonthBalance = await MovementsFinancialAnalysisService.getBalanceByMonth(userId, month);
        res.json({ MonthBalance });
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

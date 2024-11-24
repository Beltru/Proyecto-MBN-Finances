import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const categorias = ['Vivienda', 'Transporte', 'Alimentacion', 'Salud y bienestar', 'Ropa y calzado', 'Educacion', 'Entretenimiento', 'Tecnologia']; // Categorías

const BudgetRecomendations = {
    "Vivienda": 0.20,          // 20% del salario
    "Transporte": 0.20,        // 20% del salario
    "Alimentacion": 0.10,      // 10% del salario
    "Salud y bienestar": 0.10, // 10% del salario
    "Ropa y calzado": 0.10,    // 10% del salario
    "Educacion": 0.10,         // 10% del salario
    "Entretenimiento": 0.10,   // 10% del salario
    "Tecnologia": 0.10         // 10% del salario
};

const MakeRecomendationsComparations = async (userId) => {
    const client = new Client(config);
    await client.connect();

    //console.log(userId);

    let MonthSalaryJson = await client.query(
        `SELECT SUM(monto) AS salario
        FROM movimientos_financieros
        WHERE id_usuario = $1
            AND monto < 0
            AND DATE_PART('month', fecha) = DATE_PART('month', CURRENT_DATE)
            AND DATE_PART('year', fecha) = DATE_PART('year', CURRENT_DATE)`,
        [userId]
    );

    let MonthSalary = MonthSalaryJson.rows[0].salario;

    const recomendations = [];

    try 
    { 
        for (let categoria of categorias) {
        
            let CategoryExpensesJson = await client.query(
                `SELECT SUM(monto) AS gasto
                FROM movimientos_financieros
                WHERE id_usuario = $1
                    AND monto < 0
                    AND categoria = $2
                    AND DATE_PART('month', fecha) = DATE_PART('month', CURRENT_DATE)
                    AND DATE_PART('year', fecha) = DATE_PART('year', CURRENT_DATE)`,
                [userId, categoria] 
            );

            //----------------------------------------------------------------------------------------------------------

            const { rows: expenses } = await client.query(
                `SELECT DATE_PART('month', fecha) AS month, SUM(monto) AS expense
                FROM movimientos_financieros
                WHERE id_usuario = $1
                    AND monto < 0
                    AND categoria = $2
                    AND fecha >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY DATE_PART('month', fecha)
                ORDER BY month ASC`,
                [userId, categoria]
            );

            if (expenses.length === 0) {
                recomendations.push(`No se han registrado gastos en ${categoria} en los últimos 3 meses.`);
                continue;
            }

            //----------------------------------------------------------------------------------------------------------

            let CategoryExpenses = CategoryExpensesJson.rows[0].gasto;

            let CategoryBudget = MonthSalary * BudgetRecomendations[categoria];

            if (CategoryExpenses > CategoryBudget) 
            {
                recomendations.push(`Has excedido tu presupuesto en ${categoria}. Gasto actual: $${CategoryExpenses}, Presupuesto: $${CategoryBudget}. Considera reducir los gastos en esta categoría.`);
            } 
            else if (CategoryExpenses === 0) 
            {
                recomendations.push(`No has registrado gastos en ${categoria} este mes. ¡Es un buen momento para ahorrar o redistribuir tu presupuesto!`);
            } 
            else 
            {
                recomendations.push(`Tu gasto en ${categoria} está dentro del presupuesto. Gasto actual: $${CategoryExpenses}, Presupuesto: $${CategoryBudget}. Sigue así.`);
            }    
        } 

        return recomendations;

    }   
    catch (error) 
    {
        throw error;
    } 
    finally 
    {
        await client.end();
    }
};



const MakeRecomendationsTendency = async (userId) => {
    const client = new Client(config);
    await client.connect();

    const MonthSalaryJson = await client.query(
        `SELECT SUM(monto) AS salario
        FROM movimientos_financieros
        WHERE id_usuario = $1
            AND monto < 0
            AND DATE_PART('month', fecha) = DATE_PART('month', CURRENT_DATE)
            AND DATE_PART('year', fecha) = DATE_PART('year', CURRENT_DATE)`,
        [userId]
    );

    const MonthSalary = MonthSalaryJson.rows[0].salario;
    const recomendations = [];

    try {
        for (let categoria of categorias) {
            const { rows: expenses } = await client.query(
                `SELECT DATE_PART('month', fecha) AS month, SUM(monto) AS expense
                FROM movimientos_financieros
                WHERE id_usuario = $1
                    AND monto < 0
                    AND categoria = $2
                    AND fecha >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY DATE_PART('month', fecha)
                ORDER BY month ASC`,
                [userId, categoria]
            );

            if (expenses.length === 0) {
                recomendations.push(`No se han registrado gastos en ${categoria} en los últimos 3 meses.`);
                continue;
            }

            // Calcular diferencias entre meses
            let Diferences = [];
            for (let i = 1; i < expenses.length; i++) {
                Diferences.push(expenses[i].expense - expenses[i - 1].expense);
            }

            // Determinar tendencia
            const CategoryBudget = MonthSalary * BudgetRecomendations[categoria];
            const Tolerance = CategoryBudget * 0.1; // 10% del presupuesto como tolerancia

            let Tendency = "Irregular";
            if (Diferences.every(diff => Math.abs(diff) <= Tolerance)) {
                Tendency = "Estable";
            } else if (Diferences.every(diff => diff > Tolerance)) {
                Tendency = "Aumento";
            } else if (Diferences.every(diff => diff < -Tolerance)) {
                Tendency = "Disminución";
            }

            // Generar recomendación basada en la tendencia
            switch (Tendency) {
                case "Estable":
                    recomendations.push(`Tus gastos en ${categoria} han sido estables en los últimos 3 meses. ¡Sigue así!`);
                    break;
                case "Aumento":
                    recomendations.push(`Tus gastos en ${categoria} han mostrado un aumento constante. Considera ajustar tus gastos en esta categoría.`);
                    break;
                case "Disminución":
                    recomendations.push(`Tus gastos en ${categoria} han disminuido en los últimos meses. Es una oportunidad para ahorrar más.`);
                    break;
                default:
                    recomendations.push(`Tus gastos en ${categoria} muestran un comportamiento irregular. Revisa esta categoría para entender mejor tus patrones de gasto.`);
            }
        }

        return recomendations;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};



export default { 
    MakeRecomendationsComparations, 
    MakeRecomendationsTendency
};

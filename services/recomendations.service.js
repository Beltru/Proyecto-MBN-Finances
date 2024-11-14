import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const MakeRecomendationsComparation = async (userId) => {
    const client = new Client(config);
    await client.connect();

    const categorias = ['Comida', 'Transporte', 'Educacion', 'Entretenimiento']; // Categorías

    const BudgetRecomendations = {
        "Vivienda": 0.20,          // 20% del salario
        "Transporte": 0.20,        // 20% del salario
        "Alimentación": 0.10,      // 10% del salario
        "Salud y bienestar": 0.10, // 10% del salario
        "Ropa y calzado": 0.10,    // 10% del salario
        "Educación": 0.10,         // 10% del salario
        "Entretenimiento": 0.10,   // 10% del salario
        "Tecnología": 0.10         // 10% del salario
    };

    MonthSalaryJson = await client.query(
        `SELECT SUM(monto) AS salario
        FROM movimientos_financieros
        WHERE userId = $1
            AND monto < 0
            AND DATE_PART('month', fecha) = DATE_PART('month', CURRENT_DATE)
            AND DATE_PART('year', fecha) = DATE_PART('year', CURRENT_DATE)`,
        [userId]
    );
    
    MonthSalary = MonthSalaryJson.rows[0].salario;

    const recomendations = [];
    try 
    { 
        for (let categoria of categorias) {
        
            CategoryExpensesJson = await client.query(
                `SELECT SUM(monto) AS gasto
                FROM movimientos_financieros
                WHERE userId = $1
                    AND monto < 0
                    AND categoria = $2
                    AND DATE_PART('month', fecha) = DATE_PART('month', CURRENT_DATE)
                    AND DATE_PART('year', fecha) = DATE_PART('year', CURRENT_DATE)`,
                [userId, categoria] 
            );

            CategoryExpenses = CategoryExpensesJson.rows[0].gasto;

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

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;
        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

export default { 
    MakeRecomendationsComparation, 
    MakeRecomendationsTendency
};

import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const MakeRecomendationsComparation = async (userId) => {
    const client = new Client(config);
    await client.connect();

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

    const categorias = ['Vivienda', 'Transporte', 'Alimentacion', 'Salud y bienestar', 'Ropa y calzado', 'Educacion', 'Entretenimiento', 'Tecnologia']; // Categorías
    const recomendations = [];

    try {
        for (let categoria of categorias) 
        {
            const { rows: gastos } = await client.query(
                ` SELECT DATE_PART('month', fecha) AS mes, SUM(monto) AS gasto
                FROM movimientos_financieros
                WHERE userId = $1
                    AND monto < 0
                    AND categoria = $2
                    AND fecha >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY DATE_PART('month', fecha)
                ORDER BY mes ASC`,
                [userId, categoria]
            );

            if (gastos.length === 0) {
                recomendations.push(`No se han registrado gastos en ${categoria} en los últimos 3 meses.`);
                continue;
            }

            // Analizamos la tendencia
            let tendencia = "estable"; // Puede ser: "aumento", "disminución", "estable"
            if (gastos.length >= 2) {
                const diferencias = [];
                for (let i = 1; i < gastos.length; i++) {
                    diferencias.push(gastos[i].gasto - gastos[i - 1].gasto);
                }

                const sumaDiferencias = diferencias.reduce((acc, val) => acc + val, 0);
                if (sumaDiferencias > 0) tendencia = "aumento";
                else if (sumaDiferencias < 0) tendencia = "disminución";
            }

            // Agregamos la recomendación basada en la tendencia
            switch (tendencia) {
                case "aumento":
                    recomendations.push(`Tu gasto en ${categoria} muestra una tendencia al aumento. Considera ajustar tus gastos.`);
                    break;
                case "disminución":
                    recomendations.push(`Tu gasto en ${categoria} está disminuyendo. ¡Buen trabajo! Sigue controlando tus finanzas.`);
                    break;
                case "estable":
                default:
                    recomendations.push(`Tu gasto en ${categoria} ha sido estable en los últimos 3 meses.`);
                    break;
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
    MakeRecomendationsComparation, 
    MakeRecomendationsTendency
};

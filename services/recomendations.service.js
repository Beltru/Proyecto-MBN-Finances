import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const MakeRecomendationsComparation = async (userId) => {
    const client = new Client(config);
    await client.connect();

    const categorias = ['Comida', 'Transporte', 'Educacion', 'Entretenimiento']; // Categorías

    const BudgetRecomendations = [
        "Alquiler": 0.30,        // 30% del salario
        "Alimentación": 0.15,    // 15% del salario
        "Transporte": 0.10,      // 10% del salario
        "Ahorro": 0.10,          // 10% del salario
        "Entretenimiento": 0.05, // 5% del salario
        "Ropa": 0.05             // 5% del salario
    ];

    for (let categoria of categorias) {
        try 
        { 


            let CategoryBudget = Salary % CategoryPercent[categoria];

            if (CategoryExpenses > CategoryBudget) 
            {
                recomendations.push(`Has excedido tu presupuesto en ${categoria}. Gasto actual: $${gastoActual}, Presupuesto: $${presupuesto}. Considera reducir los gastos en esta categoría.`);
            } 
            else if (gastoActual === 0) 
            {
                recomendaciones.push(`No has registrado gastos en ${categoria} este mes. ¡Es un buen momento para ahorrar o redistribuir tu presupuesto!`);
            } 
            else 
            {
                recomendaciones.push(`Tu gasto en ${categoria} está dentro del presupuesto. Gasto actual: $${gastoActual}, Presupuesto: $${presupuesto}. Sigue así.`);
            }    
        } 
        catch (error) 
        {
            await client.end();
            throw error;
        }
    }

    await client.end();
    return rows;
    
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

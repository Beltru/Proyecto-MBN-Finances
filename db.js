import "dotenv/config";
//import pkg from 'pg';
//const { Client } = pkg;

// Configuración del cliente
export const config = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
};

// Crear una nueva instancia de Client con la configuración
/*

export const client = new Client(config);

// Conexión a la base de datos
client.connect()
    .then(() => {
        console.log("Conexión a la base de datos exitosa");
    })
    .catch(err => {
        console.error("Error de conexión a la base de datos", err.stack);
    }); 
    
*/

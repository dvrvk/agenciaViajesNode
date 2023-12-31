import Sequelize from 'sequelize';
import dotenv from 'dotenv/config';

// (nombre de la base de datos, nombre usuario, password,' configuraciones (local, puerto por defecto, mysql porque tambien soporta otras bases, tiende agregar un par de columnas al actualizar columnas,  ))
const db = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT, 
    dialect: 'mysql', 
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, 
        idle: 10000
    }, 
    operatorAliases: false
});

export default db;
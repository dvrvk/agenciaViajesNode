// Importar express - comond JS
// const express = require('express');

// Importar Express Actual
import express from 'express';
import router from './routes/index.js'
import db from './config/db.js';

// Conectar a la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Función para ejecutar express -> se asigna a app
const app = express();

// Definir puerto - variables de entorno (la asigna el servidor automaticamente)
const port = process.env.PORT || 4000;

// TODO ESTO SON MIDDLEWARES

// Crear el propio midleware para obtener el año actual - next lo utiliza para ir al siguiente middleware
app.use((req, res, next)=> {
    // Utilizamos res.local para crear nuevas variables y compartir valores a las vistas
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Habilitar template PUG
app.set('view engine', 'pug');

// Definir carpeta publica
app.use(express.static('public'));

// Agregar router - soporta get, post, put, delete
app.use('/', router);



// Arranca el servidor (puerto, callback)
app.listen(port, ()=>{
    console.log(`El servidor esta conectado en el puerto ${port}`)
})
import { Viaje } from "../models/Viaje.js";
import { Opinion } from "../models/Opiniones.js";

const paginaInicio = async (req, res)=> {
    // Coonsultar 3 viajes del modelo viaje

    const promiseDB = [];
    promiseDB.push(await Viaje.findAll({limit: 3}));
    promiseDB.push(await Opinion.findAll({limit: 3}));
    try {
        // Permite que las dos consultas arranquen al mismo tiempo
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home', 
            viajes: resultado[0],
            opiniones: resultado[1]
        });
    } catch (error) {
        console.log(error)
    } 

};

const paginaNosotros = (req, res)=> {
    // nombre de la vista, {info que le pasamos}
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res)=> {
    // consultar BD - findAll trae todo lo que tenga esa tabla
    const viajes = await Viaje.findAll();

    // Aquí paso los datos a la vista
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {viaje} = req.params;
    

    try {
        // Trae un registro que coincida slug(columna de la tabla) con el parametro pasado (viaje)
        const resultado = await Viaje.findOne({where: {slug: viaje}})
        res.render('viaje', {
            pagina: 'Información viaje',
            resultado
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaOpiniones = async (req, res)=> {
    try {
        const opiniones = await Opinion.findAll();


        res.render('opiniones', {
            pagina: 'Opiniones',
            opiniones
        })
    } catch (error) {
        console.log(error)
    }

    
};

export {
    paginaInicio, 
    paginaNosotros,
    paginaViajes, 
    paginaOpiniones, 
    paginaDetalleViaje
}
import { Opinion } from "../models/Opiniones.js";

const guardarOpinion = async (req, res) => {
    // Validar
    const {nombre, email, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: "El nombre esta vacío"});
    }

    if(email.trim() === '') {
        errores.push({mensaje: "El email esta vacío"});
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje: "El mensaje esta vacío"});
    }

    if(errores.length > 0){
        // Mostrar la vista con errores
        const opiniones = await Opinion.findAll();

        res.render('opiniones', {
            pagina: 'Opiniones',
            errores,
            nombre,
            email,
            mensaje,
            opiniones
        })
    } else {
        // Almacenar en la base de datos
        try {
            // Insertar la opinion
            await Opinion.create({
                nombre,
                email,
                mensaje
            })

            res.redirect('/opiniones');
        } catch (error) {
            console.log(error)
        } 

    }

}

export {
    guardarOpinion
}
import express from 'express';
import { paginaInicio, paginaNosotros, paginaViajes, paginaOpiniones, paginaDetalleViaje } from '../controller/paginasController.js';
import { guardarOpinion } from '../controller/opinionesController.js';

const router = express.Router();

// req (es lo que envio), res (es lo que express responde)
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros)

router.get('/viajes', paginaViajes);
// Usamos el comodín para que sea dinámico el nombre
router.get('/viajes/:viaje', paginaDetalleViaje);

router.get('/opiniones', paginaOpiniones);
router.post('/opiniones', guardarOpinion);


export default router;
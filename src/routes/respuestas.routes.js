import express from 'express';
import respuestaController from '../controllers/respuestas.controller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js';

const router = express.Router();

router.post(
  '/',
  verificarJWT,
  verificarRol('rector', 'orientador'),
  respuestaController.crearOpcion
);
router.get('/', verificarJWT, respuestaController.obtenerOpcionesPorPregunta);

export default router;

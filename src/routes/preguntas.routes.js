import express from 'express';
import preguntaController from '../controllers/preguntas.controller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js';

const router = express.Router();

router.post(
  '/',
  verificarJWT,
  verificarRol('rector', 'orientador'),
  preguntaController.crearPregunta
);
router.get('/', verificarJWT, preguntaController.obtenerPreguntas);
router.get('/:id', verificarJWT, preguntaController.obtenerPreguntaPorId);
router.put(
  '/:id',
  verificarJWT,
  verificarRol('rector', 'orientador'),
  preguntaController.actualizarPregunta
);

export default router;
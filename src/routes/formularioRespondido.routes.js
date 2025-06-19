import express from 'express';
import formularioRespondidoController from '../controllers/formularioRespondido.controller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js';

const router = express.Router();

router.post(
  '/',
  verificarJWT,
  verificarRol('estudiante'),
  formularioRespondidoController.crearFormulario
);
router.get(
  '/',
  verificarJWT,
  verificarRol('rector', 'orientador'),
  formularioRespondidoController.obtenerFormulariosPorEstudiante
);

export default router;

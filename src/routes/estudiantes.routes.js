import express from 'express';
import estudianteController from '../controllers/estudiante.controller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js';

const router = express.Router();


router.post(
  '/',
  verificarJWT,
  verificarRol('orientador', 'rector'),
  estudianteController.crearEstudiante
);
router.get(
  '/',
  verificarJWT,
  verificarRol('superadmin', 'rector', 'orientador'),
  estudianteController.obtenerEstudiantes
);
router.get(
  '/:id',
  verificarJWT,
  verificarRol('superadmin', 'rector', 'orientador'),
  estudianteController.obtenerEstudiantePorId
);
router.put(
  '/:id',
  verificarJWT,
  verificarRol('superadmin', 'rector', 'orientador'),
  estudianteController.actualizarEstudiante
);

export default router;

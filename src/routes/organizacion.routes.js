import express from 'express';
import organizacionController from '../controllers/organizacion.controller.js'
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js';

const router = express.Router();

router.post(
  '/',
  organizacionController.crearOrganizacion
);
router.get(
  '/',
  verificarJWT,
  verificarRol('superadmin'),
  organizacionController.obtenerOrganizaciones
);
router.get(
  '/:id',
  verificarJWT,
  verificarRol('superadmin', 'rector', 'orientador'),
  organizacionController.obtenerOrganizacionPorId
);
router.put(
  '/:id',
  verificarJWT,
  verificarRol('superadmin', 'rector'),
  organizacionController.actualizarOrganizacion
);

export default router;
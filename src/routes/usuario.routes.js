import express from 'express';
import usuarioController from '../controllers/usuario.controller.js'
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js';

const router = express.Router();

router.post(
  '/',
  usuarioController.crearUsuario
);
router.get('/', verificarJWT, verificarRol('superadmin'), usuarioController.obtenerUsuarios);
router.get(
  '/:id',
  verificarJWT,
  verificarRol('superadmin', 'rector', 'orientador'),
  usuarioController.obtenerUsuarioPorId
);
router.put('/:id', verificarJWT, verificarRol('superadmin'), usuarioController.actualizarUsuario);

export default router;

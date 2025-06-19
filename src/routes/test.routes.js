import express from 'express';
import testController from '../controllers/test.controller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
import verificarRol from '../middlewares/verificarRol.js'

const router = express.Router();

router.post('/', verificarJWT, verificarRol('rector', 'orientador'), testController.crearTest);
router.get('/', verificarJWT, testController.obtenerTests);
router.get('/:id', verificarJWT, testController.obtenerTestPorId);
router.put(
  '/:id',
  verificarJWT,
  verificarRol('rector', 'orientador'),
  testController.actualizarTest
);

export default router;
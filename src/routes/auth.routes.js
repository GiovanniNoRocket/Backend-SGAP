import express from 'express';
import { login, crearUsuarioRectoria } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);

router.post('/', crearUsuarioRectoria);


export default router;
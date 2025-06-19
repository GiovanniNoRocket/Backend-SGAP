import express from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

  const esValido = await usuario.validarPassword(password);
  if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET || 'secreto', 
    { expiresIn: '1d' }
  );

  res.json({ token, usuario: { id: usuario._id, rol: usuario.rol, email: usuario.email } });
});

export default router;
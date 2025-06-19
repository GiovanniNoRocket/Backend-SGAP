import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

export default authMiddleware;
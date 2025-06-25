const verificarRol = function (...rolesPermitidos) {
  return (req, res, next) => {
    const usuario = req.usuario;
    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
    }

    if (
      usuario.rol === 'rector' &&
      req.method === 'POST' &&
      req.baseUrl.includes('/organizaciones') &&
      usuario.organizacion
    ) {
      return res
        .status(403)
        .json({ message: 'Ya perteneces a una organización, no puedes crear otra' });
    }

    next();
  };
};

export default verificarRol;
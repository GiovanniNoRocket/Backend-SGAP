import Organizacion from '../models/organizacion.model.js';
import Usuario from '../models/usuario.model.js';
import jwt from 'jsonwebtoken';

const crearUsuarioRectoria = async (req, res) => {
  try {
    const {
      nombreRector,
      apellido,
      tipoId,
      numeroId,
      emailRector,
      password,
      confirmPassword,
      telefono,
      nombreOrg,
      nit,
      razonSocial,
      emailOrg,
      urlOrg,
      direccion,
    } = req.body;

    if (
      !emailRector ||
      !password ||
      !confirmPassword ||
      !nombreRector ||
      !apellido ||
      !tipoId ||
      !numeroId ||
      !telefono
    ) {
      return res.status(400).json({ message: 'Faltan campos obligatorios del usuario' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    if (!nombreOrg || !nit || !razonSocial || !emailOrg || !direccion) {
      return res.status(400).json({ message: 'Faltan campos obligatorios de la organización' });
    }

    let organizacionExistente = await Organizacion.findOne({ nit });
    if (!organizacionExistente) {
      organizacionExistente = new Organizacion({
        nombre: nombreOrg,
        nit,
        razonSocial,
        email: emailOrg,
        url: urlOrg,
        direccion,
      });
      await organizacionExistente.save();
    }

    const nuevoUsuario = new Usuario({
      email: emailRector,
      password,
      nombres: nombreRector,
      apellidos: apellido,
      identificacion: {
        id: numeroId,
        tipo: tipoId,
      },
      telefono,
      rol: 'Rectoria',
      organizacion: organizacionExistente._id,
    });
    await nuevoUsuario.save();
    res.status(201).json({
      message: 'Usuario y organización creados correctamente',
      usuario: {
        id: nuevoUsuario._id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        nombres: nuevoUsuario.nombres,
        apellidos: nuevoUsuario.apellidos,
      },
      organizacion: {
        id: organizacionExistente._id,
        nombre: organizacionExistente.nombre,
        nit: organizacionExistente.nit,
      },
    });
  } catch (error) {
    console.error('Error al crear usuario o organización:', error);
    res.status(400).json({ message: 'Error al crear usuario o organizacion', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });

  const esValido = await usuario.validarPassword(password);
  if (!esValido) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET || 'secreto',
    { expiresIn: '1d' }
  );

  res.json({ token, usuario: { id: usuario._id, rol: usuario.rol, email: usuario.email } });
};

export { crearUsuarioRectoria, login };

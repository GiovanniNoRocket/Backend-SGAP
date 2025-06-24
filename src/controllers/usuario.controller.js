import Usuario from '../models/usuario.model.js'

const crearUsuario = async (req, res) => {
  try {
    const { email, password, nombres, apellidos, identificacion, telefono, rol, organizacion } =
      req.body;

    if (!email || !password || !nombres || !apellidos || !identificacion?.id || !identificacion?.tipo || !telefono || !rol || !organizacion) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new Usuario({
      email,
      password,
      nombres,
      apellidos,
      identificacion,
      telefono,
      rol,
      organizacion,
    });

    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: nuevoUsuario._id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        nombres: nuevoUsuario.nombres,
        apellidos: nuevoUsuario.apellidos,
      },
    });

  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuario', error });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const camposPermitidos = ['password', 'rol', 'identificacion', 'telefono', 'rol'];
    const actualizaciones = {};

    for (let campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        actualizaciones[campo] = req.body[campo];
      }
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, actualizaciones, { new: true });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario
}
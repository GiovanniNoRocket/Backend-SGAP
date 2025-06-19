import Estudiante from '../models/estudiante.model.js';

const crearEstudiante = async (req, res) => {
  try {
    const { usuario, organizacion, grupo, jornada } = req.body;

    const nuevoEstudiante = new Estudiante({
      usuario,
      organizacion,
      grupo,
      jornada,
    });

    await nuevoEstudiante.save();
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear estudiante', error });
  }
};

const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find().populate('usuario organizacion');
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener estudiantes', error });
  }
};

const obtenerEstudiantePorId = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id).populate('usuario organizacion');
    if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar estudiante', error });
  }
};

const actualizarEstudiante = async (req, res) => {
  try {
    const camposPermitidos = ['grupo', 'jornada', 'organizacion'];
    const actualizaciones = {};

    for (let campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        actualizaciones[campo] = req.body[campo];
      }
    }

    const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, actualizaciones, {
      new: true,
    });
    if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar estudiante', error });
  }
};

export default {
  crearEstudiante,
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  actualizarEstudiante  
}
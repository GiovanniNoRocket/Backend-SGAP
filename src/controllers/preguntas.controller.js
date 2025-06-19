import Pregunta from '../models/preguntas.model.js';

const crearPregunta = async (req, res) => {
  try {
    const { texto, tipo, opciones, categoria } = req.body;
    const nuevaPregunta = new Pregunta({ texto, tipo, opciones, categoria });
    await nuevaPregunta.save();
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear pregunta', error });
  }
};

const obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener preguntas', error });
  }
};

const obtenerPreguntaPorId = async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id);
    if (!pregunta) return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar pregunta', error });
  }
};

const actualizarPregunta = async (req, res) => {
  try {
    const camposPermitidos = ['texto', 'tipo', 'opciones', 'categoria'];
    const actualizaciones = {};
    for (let campo of camposPermitidos) {
      if (req.body[campo] !== undefined) actualizaciones[campo] = req.body[campo];
    }

    const pregunta = await Pregunta.findByIdAndUpdate(req.params.id, actualizaciones, {
      new: true,
    });
    if (!pregunta) return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar pregunta', error });
  }
};

export default {
  crearPregunta,
  obtenerPreguntas,
  obtenerPreguntaPorId,
  actualizarPregunta
}
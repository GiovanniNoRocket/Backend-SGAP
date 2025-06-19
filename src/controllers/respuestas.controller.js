import respuesta from '../models/respuestas.model.js';

const crearOpcion = async (req, res) => {
  try {
    const { pregunta, texto, valor } = req.body;
    const opcion = new respuesta({ pregunta, texto, valor });
    await opcion.save();
    res.status(201).json(opcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear opción de respuesta' });
  }
};

const obtenerOpcionesPorPregunta = async (req, res) => {
  try {
    const opciones = await respuesta.find({ pregunta: req.params.preguntaId });
    res.json(opciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener opciones' });
  }
};

export default {
  crearOpcion,
  obtenerOpcionesPorPregunta,
};
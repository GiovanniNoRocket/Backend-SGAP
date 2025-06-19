import FormularioRespondido from '../models/formularioRespondido.model.js';

const crearFormulario = async (req, res) => {
  try {
    const { estudiante, test, observaciones } = req.body;
    const formulario = new FormularioRespondido({ estudiante, test, observaciones });
    await formulario.save();
    res.status(201).json(formulario);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar formulario' });
  }
};

const obtenerFormulariosPorEstudiante = async (req, res) => {
  try {
    const formularios = await FormularioRespondido.find({
      estudiante: req.params.estudianteId,
    }).populate('test');
    res.json(formularios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener formularios' });
  }
};

export default {
  crearFormulario,
  obtenerFormulariosPorEstudiante,
};

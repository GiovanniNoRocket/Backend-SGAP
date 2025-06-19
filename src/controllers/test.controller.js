import Test from '../models/test.model.js'

const crearTest = async (req, res) => {
  try {
    const { nombre, descripcion, preguntas, organizacion, creadoPor } = req.body;
    const nuevoTest = new Test({ nombre, descripcion, preguntas, organizacion, creadoPor });
    await nuevoTest.save();
    res.status(201).json(nuevoTest);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear test', error });
  }
};

const obtenerTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('preguntas creadoPor organizacion');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tests', error });
  }
};

const obtenerTestPorId = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('preguntas');
    if (!test) return res.status(404).json({ mensaje: 'Test no encontrado' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar test', error });
  }
};

const actualizarTest = async (req, res) => {
  try {
    const camposPermitidos = ['nombre', 'descripcion', 'preguntas'];
    const actualizaciones = {};
    for (let campo of camposPermitidos) {
      if (req.body[campo] !== undefined) actualizaciones[campo] = req.body[campo];
    }

    const test = await Test.findByIdAndUpdate(req.params.id, actualizaciones, { new: true });
    if (!test) return res.status(404).json({ mensaje: 'Test no encontrado' });
    res.json(test);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar test', error });
  }
};

export default{
  crearTest,
  obtenerTests,
  obtenerTestPorId,
  actualizarTest
};
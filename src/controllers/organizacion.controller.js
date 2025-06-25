import Organizacion from '../models/organizacion.model.js'

const crearOrganizacion = async (req, res) => {
  try {
    const { nit,nombre, nombreContacto, razonSocial, email, urlWeb, direccion } = req.body;
    const nuevaOrg = new Organizacion({
      nit,
      nombre,
      nombreContacto,
      razonSocial,
      email,
      urlWeb,
      direccion
    });

    await nuevaOrg.save();
    res.status(201).json(nuevaOrg);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear organización', error });
  }
};

const obtenerOrganizaciones = async (req, res) => {
  try {
    const organizaciones = await Organizacion.find();
    res.json(organizaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener organizaciones', error });
  }
};

const obtenerOrganizacionPorId = async (req, res) => {
  try {
    const organizacion = await Organizacion.findById(req.params.id);
    if (!organizacion) return res.status(404).json({ message: 'Organización no encontrada' });
    res.json(organizacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar organización', error });
  }
};

const actualizarOrganizacion = async (req, res) => {
  try {
    const camposPermitidos = ['nombre', 'codigoDANE', 'municipio'];
    const actualizaciones = {};

    for (let campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        actualizaciones[campo] = req.body[campo];
      }
    }

    const organizacion = await Organizacion.findByIdAndUpdate(req.params.id, actualizaciones, {
      new: true,
    });
    if (!organizacion) return res.status(404).json({ message: 'Organización no encontrada' });
    res.json(organizacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar organización', error });
  }
};

export default {
  crearOrganizacion,
  obtenerOrganizaciones,
  obtenerOrganizacionPorId,
  actualizarOrganizacion
}
import mongoose from 'mongoose';

const EstudianteSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  sexo: { type: String, required: true, enum: ['M', 'F', 'Otro'] },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  jornada: {
    type: String,
    enum: ['Mañana', 'Tarde', 'Noche'],
    required: true,
  },
  grado: {
    type: String,
    required: true,
  },
  grupo: {
    type: String,
    required: true,
  },
  lugarNacimiento: { type: String },
  telefonoAcudiente: { type: String },
  eps: { type: String },
  discapacidad: [{ type: String }],
});

export default mongoose.model('Estudiante', EstudianteSchema);

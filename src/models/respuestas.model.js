import mongoose from 'mongoose';

const respuestaSchema = new mongoose.Schema(
  {
    estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante', required: true },
    pregunta: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
    opcionSeleccionada: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OpcionRespuesta',
      required: true,
    },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    formulario: { type: mongoose.Schema.Types.ObjectId, ref: 'FormularioRespondido' },
  },
  { timestamps: true }
);

export default mongoose.model('Respuesta', respuestaSchema);

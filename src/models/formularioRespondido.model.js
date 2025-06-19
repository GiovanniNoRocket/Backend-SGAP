import mongoose from 'mongoose';

const formularioRespondidoSchema = new mongoose.Schema({
  estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  fecha: { type: Date, default: Date.now },
  observaciones: { type: String }
}, { timestamps: true });

export default mongoose.model('FormularioRespondido', formularioRespondidoSchema);
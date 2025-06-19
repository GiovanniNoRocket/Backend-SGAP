import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true },
    organizacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizacion', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Test', testSchema);

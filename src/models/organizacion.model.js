import mongoose from 'mongoose';

const organizacionSchema = new mongoose.Schema(
  {
    nit: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    nombreContacto: { type: String },
    razonSocial: { type: String },
    email: { type: String },
    urlWeb: { type: String },
    direccion: {type: String, required: true},
  },
  { timestamps: true }
);

export default mongoose.model('Organizaciones', organizacionSchema);

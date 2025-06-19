import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  identificacion: {
    id: { type: String, required: true, unique: true },
    tipo: { type: String, required: true, enum: ['CC', 'TI', 'CE', 'NIT', 'Pasaporte'] },
  },
  telefono: { type: String, required: true },
  rol: {
    type: String,
    enum: ['Estudiante', 'Orientador Escolar', 'Rectoria'],
    required: true,
  },
  organizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizacion',
    required: true,
  },
});

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UsuarioSchema.methods.validarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('Usuario', UsuarioSchema);

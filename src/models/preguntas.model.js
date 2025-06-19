import mongoose from 'mongoose'

const preguntaSchema = new mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    enunciado: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pregunta",preguntaSchema)
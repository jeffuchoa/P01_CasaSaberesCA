var mongoose = require("mongoose")

var arquivoSchema = new mongoose.Schema(
  {
    nomeOriginal: { type: String, required: true },
    chave: { type: String, required: true },
    tamanho: { type: Number, required: true },
    mimeType: { type: String, required: true },
  },
  { _id: false }
)

var trabalhoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true }, // nome de quem fez o trabalho, não necessariamente quem logou
  descricao: { type: String, required: true },
  pdf: { type: arquivoSchema, required: true },
  thumbnail: { type: arquivoSchema, required: true },
  enviadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
  criadoEm: { type: Date, default: Date.now },
})

module.exports = mongoose.model("trabalhos", trabalhoSchema)
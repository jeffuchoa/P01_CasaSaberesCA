var mongoose = require("mongoose")

var pdfSchema = new mongoose.Schema({
  nomeOriginal: { type: String, required: true },
  chave: { type: String, required: true },
  tamanho: { type: Number, required: true },
  mimeType: { type: String, required: true },
  enviadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
  criadoEm: { type: Date, default: Date.now },
})

module.exports = mongoose.model("pdfs", pdfSchema)
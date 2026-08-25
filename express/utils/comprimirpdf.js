var { execFile } = require("child_process")
var fs = require("fs/promises")
var os = require("os")
var path = require("path")
var crypto = require("crypto")

async function comprimirPdf(bufferOriginal) {
  var pastaTemp = os.tmpdir()
  var nomeTemp = crypto.randomUUID()
  var caminhoEntrada = path.join(pastaTemp, nomeTemp + "-in.pdf")
  var caminhoSaida = path.join(pastaTemp, nomeTemp + "-out.pdf")

  try {
    await fs.writeFile(caminhoEntrada, bufferOriginal)

    await new Promise((resolve, reject) => {
      execFile("gs", [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/ebook",
        "-dNOPAUSE",
        "-dBATCH",
        "-dQUIET",
        "-sOutputFile=" + caminhoSaida,
        caminhoEntrada,
      ], function (err) {
        if (err) reject(err)
        else resolve()
      })
    })

    var bufferComprimido = await fs.readFile(caminhoSaida)

    // Se por algum motivo a versão "comprimida" ficou maior, usa a original
    return bufferComprimido.length < bufferOriginal.length ? bufferComprimido : bufferOriginal
  } catch (err) {
    console.error("Falha ao comprimir PDF, usando original:", err)
    return bufferOriginal // nunca quebra o upload por causa da compressão
  } finally {
    await fs.unlink(caminhoEntrada).catch(() => {})
    await fs.unlink(caminhoSaida).catch(() => {})
  }
}

module.exports = comprimirPdf
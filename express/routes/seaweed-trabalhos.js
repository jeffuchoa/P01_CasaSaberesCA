var autenticar = require("../middlewares/auth.middleware")
var somenteAdmin = require("../middlewares/admin.middleware")
var Trabalho = require("../models/pdf/Pdf")
var { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")

// Criar (admin only)
router.post(
  "/",
  autenticar,
  somenteAdmin,
  uploadCampos,
  async function (req, res) {
    try {
      var arquivoPdf = req.files.pdf[0]
      var arquivoThumb = req.files.thumbnail[0]

      var chavePdf = "pdfs/" + Date.now() + "-" + arquivoPdf.originalname
      var chaveThumb = "thumbnails/" + Date.now() + "-" + arquivoThumb.originalname

      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: chavePdf,
        Body: arquivoPdf.buffer,
        ContentType: arquivoPdf.mimetype,
      }))

      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: chaveThumb,
        Body: arquivoThumb.buffer,
        ContentType: arquivoThumb.mimetype,
      }))

      var trabalho = await Trabalho.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        descricao: req.body.descricao,
        pdf: {
          nomeOriginal: arquivoPdf.originalname,
          chave: chavePdf,
          tamanho: arquivoPdf.size,
          mimeType: arquivoPdf.mimetype,
        },
        thumbnail: {
          nomeOriginal: arquivoThumb.originalname,
          chave: chaveThumb,
          tamanho: arquivoThumb.size,
          mimeType: arquivoThumb.mimetype,
        },
        enviadoPor: req.usuario.id,
      })

      res.status(201).json(trabalho)
    } catch (err) {
      console.error(err)
      res.status(500).json({ erro: "Falha ao criar trabalho" })
    }
  }
)

// Listar (público)
router.get("/", async function (req, res) {
  try {
    var trabalhos = await Trabalho.find()
      .populate("enviadoPor", "nome")
      .sort({ criadoEm: -1 })
    res.json(trabalhos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha ao listar trabalhos" })
  }
})

// Baixar o PDF de um trabalho (público)
router.get("/:id/pdf", async function (req, res) {
  try {
    var trabalho = await Trabalho.findById(req.params.id)
    if (!trabalho) return res.status(404).json({ erro: "Trabalho não encontrado" })

    var resultado = await s3Client.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: trabalho.pdf.chave,
    }))

    res.setHeader("Content-Type", trabalho.pdf.mimeType)
    res.setHeader("Content-Disposition", `attachment; filename="${trabalho.pdf.nomeOriginal}"`)
    resultado.Body.pipe(res)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha no download" })
  }
})

// Ver a thumbnail de um trabalho (público)
router.get("/:id/thumbnail", async function (req, res) {
  try {
    var trabalho = await Trabalho.findById(req.params.id)
    if (!trabalho) return res.status(404).json({ erro: "Trabalho não encontrado" })

    var resultado = await s3Client.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: trabalho.thumbnail.chave,
    }))

    res.setHeader("Content-Type", trabalho.thumbnail.mimeType)
    resultado.Body.pipe(res) // sem "attachment" — pra exibir direto, não baixar
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha ao carregar thumbnail" })
  }
})

// Excluir (admin only)
router.delete("/:id", autenticar, somenteAdmin, async function (req, res) {
  try {
    var trabalho = await Trabalho.findById(req.params.id)
    if (!trabalho) return res.status(404).json({ erro: "Trabalho não encontrado" })

    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: trabalho.pdf.chave,
    }))

    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: trabalho.thumbnail.chave,
    }))

    await Trabalho.findByIdAndDelete(req.params.id)

    res.json({ mensagem: "Trabalho excluído" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha ao excluir" })
  }
})

module.exports = router
var express = require("express")
var multer = require("multer")
var { PutObjectCommand } = require("@aws-sdk/client-s3")
var s3Client = require("../db/seaweed.connection")

var router = express.Router()
var upload = multer({ storage: multer.memoryStorage() })
var Pdf = require("../models/pdf/Pdf") // ajusta o caminho conforme onde você salvou o arquivo

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get(
//   "/listar"
//   ,
//   (req, res, next) => {
//       res.json(trabalhoService.list())
//   }
// )
var autenticar = require("../middlewares/auth.middleware")
router.post("/upload", autenticar, upload.single("pdf"), async function (req, res) {
  try {
    var key = Date.now() + "-" + req.file.originalname

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    )

    var pdf = await Pdf.create({
      nomeOriginal: req.file.originalname,
      chave: key,
      tamanho: req.file.size,
      mimeType: req.file.mimetype,
      enviadoPor: req.usuario.id, // agora sim, vem do token
    })

    res.json({ mensagem: "Upload feito", pdf: pdf })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha no upload" })
  }
})

module.exports = router
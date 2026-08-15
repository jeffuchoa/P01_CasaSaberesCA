var express = require("express")
var multer = require("multer")
var { PutObjectCommand } = require("@aws-sdk/client-s3")
var s3Client = require("../db/seaweed.connection")

var router = express.Router()
var upload = multer({ storage: multer.memoryStorage() })

router.post("/upload", upload.single("pdf"), async function (req, res) {
  try {
    var key = "pdfs/" + Date.now() + "-" + req.file.originalname

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    )

    // aqui você salva "key" no Mongo, junto com metadados (nome, quem enviou, data)

    res.json({ mensagem: "Upload feito", key: key })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha no upload" })
  }
})

module.exports = router
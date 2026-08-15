var { S3Client } = require("@aws-sdk/client-s3")

var s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  forcePathStyle: true, // obrigatório para SeaweedFS/MinIO
})

module.exports = s3Client
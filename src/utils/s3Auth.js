const { S3Client } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

module.exports = s3;

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const UserModel = require("../models/userModel");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "userphotoscatalogo",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

async function updateAvatar(file, user) {
  const { key } = file;
  const { id } = user;

  const User = await UserModel.findById(id);
  if (User.photo) {
    const deletePhoto = new DeleteObjectCommand({
      Bucket: "userphotoscatalogo",
      Key: User.photo,
    });
    await s3.send(deletePhoto);
  }

  User.photo = key;

  await User.save();
}

module.exports = { upload, updateAvatar };

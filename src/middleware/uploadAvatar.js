const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const UserModel = require("../models/userModel");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIAVBS75Z75TMVSZ6HO",
    secretAccessKey: "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",
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
      bucket: "userphotoscatalogo",
      key: User.photo,
    });
    await s3.send(deletePhoto);
  }

  User.photo = key;

  await User.save();
}

module.exports = { upload, updateAvatar };

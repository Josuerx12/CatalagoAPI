const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../utils/s3Auth");

const uploadAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: "userphotoscatalogo",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

const uploadProductPics = multer({
  storage: multerS3({
    s3: s3,
    bucket: "productphotoscatalogo",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

module.exports = { uploadAvatar, uploadProductPics, updateAvatar };

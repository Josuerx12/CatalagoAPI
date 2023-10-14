const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../utils/s3Auth");

const uploadAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_PROFILE_PIC,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

const uploadProductPics = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_PRODUCT_PIC,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

module.exports = { uploadAvatar, uploadProductPics };

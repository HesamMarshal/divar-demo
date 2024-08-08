const fs = require("fs");
const createHttpError = require("http-errors");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(path.join(process.cwd(), "public", "uploads"), {
      recursive: true,
    });
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const whiteListFormat = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (whiteListFormat.includes(file.mimetype)) {
      const ext = path.extname(file.originalname);
      const filename = new Date().getTime().toString() + ext;
      cb(null, filename);
    } else {
      cb(new createHttpError.BadRequest("format of pictures are not correct!"));
    }
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
});

module.exports = { upload };

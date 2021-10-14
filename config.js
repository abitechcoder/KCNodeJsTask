const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    //Setting where the images will be stored
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // Setting the filename of the image uploaded
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;

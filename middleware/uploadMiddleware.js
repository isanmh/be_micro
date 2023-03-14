const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(" ").join("-");
    cb(null, Date.now() + "-" + filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    if (filetypes.test(file.originalname.split(".").pop())) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("File type is not supported"));
    }
  },
});

module.exports = upload;

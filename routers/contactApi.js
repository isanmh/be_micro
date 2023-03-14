const express = require("express");
const contactApiContoller = require("../controllers/contactApiController");
const { body } = require("express-validator");
const contactValidator = require("../middleware/contactValidator");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.get("/", contactApiContoller.getAll);
router.post(
  "/",
  upload.single("image"),
  contactValidator,
  contactApiContoller.store
);
router.get("/:id", contactApiContoller.show);
router.put(
  "/:id",
  upload.single("image"),
  [
    body("name")
      .isString()
      .withMessage("Nama harus berupa string")
      .withMessage("Nama harus diisi"),
    body("email").isEmail().withMessage("Email tidak valid"),
    body("phone").isMobilePhone("id-ID").withMessage("Phone tidak valid"),
  ],
  contactApiContoller.update
);
router.delete("/:id", contactApiContoller.delete);
// search
router.get("/search/:keyword", contactApiContoller.search);
// upload API Test
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "File upload failed",
      data: {
        error: error.message,
      },
    });
  }
});

module.exports = router;

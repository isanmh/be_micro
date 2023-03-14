const router = require("express").Router();
const { body } = require("express-validator");
const contactController = require("../controllers/contactContoller");
const contactValidator = require("../middleware/contactValidator");
const upload = require("../middleware/uploadMiddleware");

// dekalarasi router menggunakan controller
router.get("/", contactController.index);
router.get("/create", contactController.create);
router.post(
  "/store",
  upload.single("image"),
  contactValidator,
  contactController.store
);
// router.post(
//   "/store",
//   [body("email").isEmail(), body("phone").isMobilePhone("id-ID")],
//   contactController.store
// );
router.get("/edit/:id", contactController.edit);
router.put("/update", contactController.update);
router.delete("/delete/:id", contactController.destroy);
// search
router.get("/search", contactController.search);

module.exports = router;

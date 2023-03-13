const express = require("express");
const contactApiContoller = require("../controllers/contactApiController");
const { body } = require("express-validator");
const contactValidator = require("../middleware/contactValidator");
const router = express.Router();

router.get("/", contactApiContoller.getAll);
router.post("/", contactValidator, contactApiContoller.store);
router.get("/:id", contactApiContoller.show);
router.put(
  "/:id",
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

module.exports = router;

const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Nama harus diisi, ")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
    .trim()
    .escape(),
  check("email")
    .notEmpty()
    .withMessage("Email harus diisi, ")
    .isEmail()
    .withMessage("Email tidak valid"),
  check("phone")
    .notEmpty()
    .withMessage("Phone harus diisi, ")
    .isMobilePhone("id-ID")
    .withMessage("Format phone tidak valid"),
  // check("image")
  //   .optional({ checkFalsy: true, nullable: true })
  //   .isMimeType("image/jpeg", "image/png", "image/gif", "image/jpg")
  //   .withMessage("File harus berupa gambar"),
];

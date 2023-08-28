const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const db = require("../database/models");
const Contact = require("../models/contactModel");
const fs = require("fs");

module.exports = {
  index: (req, res) => {
    Contact.fetchData(req.db, (err, result) => {
      if (err) throw err;
      res.render("contacts/index", {
        judul: "Contact",
        data: result,
        layout: "layouts/main-layout",
      });
    });
  },
  create: (req, res) => {
    res.render("contacts/create", {
      judul: "Create Contact",
      layout: "layouts/main-layout",
    });
  },
  store: (req, res) => {
    const errors = validationResult(req);
    const { name, email, phone } = req.body;
    const data = {
      name,
      email,
      phone,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // logika jika ada error
    if (!errors.isEmpty()) {
      //   return res.status(422).json({ errors: errors.array() });
      res.render("contacts/create", {
        layout: "layouts/main-layout",
        errors: errors.array(),
        old: data,
      });
    } else {
      Contact.insertData(req.db, data, (err, result) => {
        if (err) throw err;
        req.flash("success", "Data berhasil ditambahkan");
        res.redirect("/contacts");
      });
    }
  },
  edit: (req, res) => {
    const id = req.params.id;
    Contact.getById(req.db, id, (err, result) => {
      if (err) throw err;
      res.render("contacts/edit", {
        judul: "Edit Contact",
        data: result[0],
        layout: "layouts/main-layout",
      });
    });
  },
  update: (req, res) => {
    const { id, name, email, phone } = req.body;
    const data = {
      name,
      email,
      phone,
    };
    Contact.updateData(req.db, data, id, (err, result) => {
      if (err) throw err;
      req.flash("success", "Data berhasil diubah");
      res.redirect("/contacts");
    });
  },
  destroy: (req, res) => {
    const id = req.params.id;
    Contact.deleteData(req.db, id, (err, result) => {
      if (err) throw err;
      req.flash("success", "Data berhasil dihapus");
      res.redirect("/contacts");
    });
  },
  search: (req, res) => {
    const keyword = req.query.keyword;
    Contact.search(req.db, keyword, (err, result) => {
      if (err) throw err;
      res.render("contacts/index", {
        judul: "Contact",
        data: result,
        layout: "layouts/main-layout",
      });
    });
  },

  // menggunakan sequelize orm
//   index: (req, res) => {
//     db.Contact.findAll({
//       attribut: ["id", "name", "email", "phone"],
//       order: [["id", "DESC"]],
//     }).then((contacts) => {
//       res.render("contacts/index", {
//         judul: "Contact",
//         data: contacts,
//         layout: "layouts/main-layout",
//       });
//     });
//   },
//   store: (req, res) => {
//     // console.log(req.file);
//     const errors = validationResult(req);
//     const { name, email, phone } = req.body;
//     const img = req.file;
//     if (req.file) {
//       var image = req.file.filename;
//     } else {
//       var image = null;
//     }
//     const data = {
//       name,
//       email,
//       phone,
//       image,
//     };
//     // logika jika ada error
//     if (!errors.isEmpty()) {
//       res.render("contacts/create", {
//         layout: "layouts/main-layout",
//         errors: errors.array(),
//         old: data,
//       });
//     } else {
//       const contact = db.Contact.create({
//         name: name,
//         email: email,
//         phone: phone,
//         image: image,
//       });
//       contact
//         .then((result) => {
//           req.flash("success", "Data berhasil ditambahkan");
//           res.redirect("/contacts");
//         })
//         .catch((err) => {
//           throw err;
//         });
//     }
//   },
//   edit: (req, res) => {
//     const id = req.params.id;
//     db.Contact.findByPk(id).then((contact) => {
//       res.render("contacts/edit", {
//         judul: "Edit Contact",
//         data: contact,
//         layout: "layouts/main-layout",
//       });
//     });
//   },
//   update: (req, res) => {
//     const { id, name, email, phone } = req.body;
//     db.Contact.findByPk(id).then((contact) => {
//       // jika ada file
//       if (req.file) {
//         if (contact.image !== null) {
//           const filepath = `./public/images/${contact.image}`;
//           fs.unlinkSync(filepath);
//         }
//         var image = req.file.filename;
//       } else {
//         var image = contact.image;
//       }
//       db.Contact.update(
//         {
//           name: name,
//           email: email,
//           phone: phone,
//           image: image,
//         },
//         {
//           where: {
//             id: id,
//           },
//         }
//       ).then((result) => {
//         req.flash("success", "Data berhasil diubah");
//         res.redirect("/contacts");
//       });
//     });
//   },
//   destroy: (req, res) => {
//     const id = req.params.id;
//     db.Contact.findByPk(id).then((contact) => {
//       if (contact.image !== null) {
//         const filepath = `./public/images/${contact.image}`;
//         fs.unlinkSync(filepath);
//         // fs.unlink(filepath, (err) => {
//         //   if (err) throw err;
//         // });
//       }
//       db.Contact.destroy({
//         where: {
//           id: id,
//         },
//         // jika ada file
//       }).then((contact) => {
//         req.flash("success", "Data berhasil dihapus");
//         res.redirect("/contacts");
//       });
//     });
//   },
//   search: (req, res) => {
//     const keyword = req.query.keyword;
//     db.Contact.findAll({
//       where: {
//         // name: {
//         //   [Op.like]: "%" + keyword + "%",
//         // },
//         [Op.or]: [
//           {
//             name: {
//               [Op.like]: `%${keyword}%`,
//             },
//           },
//           {
//             phone: {
//               [Op.like]: `%${keyword}%`,
//             },
//           },
//         ],
//       },
//     }).then((contacts) => {
//       res.render("contacts/index", {
//         judul: "Contact",
//         data: contacts,
//         layout: "layouts/main-layout",
//       });
//     });
//   },
// };

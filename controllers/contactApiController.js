const { validationResult } = require("express-validator");
const db = require("../database/models");
const fs = require("fs");

const contactApiController = {
  test: (req, res) => {
    res.send({ msg: "api works" });
  },

  //get all data
  async getAll(req, res) {
    const contacts = await db.Contact.findAll({
      attribut: ["id", "name", "email", "phone"],
    });
    return res.status(200).send({
      status: "success",
      data: contacts,
    });
  },
  //get all data
  async store(req, res) {
    // console.log(req.file);
    const errors = validationResult(req);
    const { name, email, phone } = req.body;
    if (req.file) {
      var image = req.file.filename;
    } else {
      var image = null;
    }
    // logika jika ada errors
    if (!errors.isEmpty()) {
      return res.status(422).send({ status: "error", errors: errors.array() });
    } else {
      const contact = await db.Contact.create({
        name: name,
        email: email,
        phone: phone,
        image: image,
      });
      return res.status(200).send({
        status: "data berhasil ditambahkan",
        data: contact,
      });
    }
  },
  //get by id
  async show(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({
      where: { id: id },
      attribut: ["id", "name", "email", "phone"],
    });
    // if data not found
    if (!contact) {
      return res.status(404).send({ status: "data tidak ditemukan" });
    }
    return res.status(200).send({ data: contact });
  },
  //get by id
  async update(req, res) {
    const errors = validationResult(req);
    const id = req.params.id;
    const { name, email, phone } = req.body;
    // logika jika ada errors
    if (!errors.isEmpty()) {
      return res.status(422).send({ status: "error", errors: errors.array() });
    } else {
      const contact = await db.Contact.findOne({ where: { id: id } });
      if (req.file) {
        if (contact.image !== null) {
          const filepath = `./public/images/${contact.image}`;
          fs.unlinkSync(filepath);
        }
        var image = req.file.filename;
      } else {
        var image = contact.image;
      }
      if (contact) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.image = image;
        await contact.save();
        return res.status(201).send({ status: "data berhasil diupdate" });
      } else {
        return res.status(404).send({ status: "data tidak ditemukan" });
      }
    }
  },
  //   delete
  async delete(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({ where: { id: id } });
    if (contact) {
      if (contact.image !== null) {
        const filepath = `./public/images/${contact.image}`;
        fs.unlinkSync(filepath);
      }
      await contact.destroy();
      return res.status(200).send({ status: "data berhasil dihapus" });
    } else {
      return res.status(404).send({ status: "data tidak ditemukan" });
    }
  },
  // seacrh
  async search(req, res) {
    const keyword = req.params.keyword;
    const contacts = await db.Contact.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: "%" + keyword + "%",
        },
      },
    });
    if (contacts) {
      return res.status(200).send({ data: contacts });
    } else {
      return res.status(404).send({ status: "Search data tidak ditemukan" });
    }
  },
};

module.exports = contactApiController;

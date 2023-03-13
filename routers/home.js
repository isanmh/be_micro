const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("<h1>training node js</h1>");
  res.render("index", {
    judul: "training node js",
    layout: "layouts/main-layout",
  });
});

router.get("/about", (req, res) => {
  // res.json({
  //   message: "ini adalah halaman about",
  //   nama: "ihsan miftahul huda",
  //   job: "fullsatack developer",
  //   alamat: "Garut",
  // });
  const pegawai = [
    {
      nama: "ihsan",
      job: "fullstack developer",
      phone: "08123456789",
    },
    {
      nama: "Rine",
      job: "UI/UX developer",
      phone: "08123456999",
    },
    {
      nama: "Nazar",
      job: "SEO developer",
      phone: "08123456789",
    },
  ];
  res.render("about", {
    judul: "Halaman About",
    pegawai: pegawai,
    // pegawai,
    layout: "layouts/main-layout",
  });
});

router.get("/services", (req, res) => {
  // res.sendFile("services.html", { root: "./views" });
  res.render("services", {
    judul: "Halaman Services",
    layout: "layouts/main-layout",
  });
});

// routing dengan parameter
// router.get("/user/:id/email/:email", (req, res) => {
router.get("/user/:id", (req, res) => {
  //   res.send(`User Id: ${req.params.id} \n email: ${req.params.email}`);
  res.send(`User Id: ${req.params.id} \n email: ${req.query.email}`);
});

module.exports = router;

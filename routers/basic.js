const basicContoller = require("../controllers/basicContoller");

const router = require("express").Router();

// deklarasi router menggunakan controller
router.get("/", basicContoller.index);
router.get("/coba", basicContoller.basic);

module.exports = router;

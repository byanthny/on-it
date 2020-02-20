const { Router } = require("express");
const { note: ctrlr } = require("../controllers");

const router = Router();

router.route("/").get();

module.exports = router;

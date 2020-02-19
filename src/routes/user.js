const { Router } = require("express");
const { user: ctrlr } = require("../controllers");

const router = Router();

router.route("/").post(ctrlr.post.one);

router.route("/:uid").get(ctrlr.get.one);

module.exports = router;

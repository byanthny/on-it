const { Router } = require("express");
const {
  token: { requireToken }
} = require("../middleware");
const { user: ctrlr } = require("../controllers");

const router = Router();

router.route("/:uid").delete(requireToken, ctrlr.delete.one);

module.exports = router;

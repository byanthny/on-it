const { Router } = require("express");
const {
  token: { requireToken },
  user: { requireMatchingUids }
} = require("../middleware");
const { project: ctrlr } = require("../controllers");

const router = Router();

router.route("/:uid").post(requireToken, requireMatchingUids, ctrlr.post.one);

module.exports = router;

const { Router } = require("express");
const {
  token: { requireToken },
  user: { requireMatchingUids }
} = require("../middleware");
const { user: ctrlr } = require("../controllers");

const router = Router();

router
  .route("/:uid")
  .get(requireToken, requireMatchingUids, ctrlr.get.one)
  .delete(requireToken, requireMatchingUids, ctrlr.delete.one);

module.exports = router;

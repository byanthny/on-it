const { Router } = require("express");
const { task: ctrlr } = require("../controllers");
const {
  token: { requireToken }
} = require("../middleware");

const router = Router();

router
  .route("/:uid")
  .get(requireToken, ctrlr.get.many)
  .post(requireToken, ctrlr.post.one);

router
  .route("/:uid/:tid")
  .get(requireToken, ctrlr.get.one)
  .put(requireToken, ctrlr.put.one)
  .delete(requireToken, ctrlr.delete.one);

module.exports = router;

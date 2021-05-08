const { Router } = require("express");
const { note: ctrlr } = require("../controllers");

const router = Router();

router
  .route("/:uid")
  .get(ctrlr.get.many)
  .post(ctrlr.post.one);

router
  .route("/:uid/:nid")
  .get(ctrlr.get.one)
  .put(ctrlr.put.one)
  .delete(ctrlr.delete.one);

module.exports = router;

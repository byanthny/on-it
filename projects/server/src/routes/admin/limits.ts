import { Router } from "express"
import ctrlr from "../../controllers"

export default Router()
  .post("/", ctrlr.limits.post.one)
  .get("/", ctrlr.limits.get.all)
  .get("/:role", ctrlr.limits.get.one)
  .patch("/:role", ctrlr.limits.patch.one)


import { Router } from "express"
import ctrlr from "../../controllers"

export default Router()
  // C
  .post("/", ctrlr.limits.post.one)
  // R
  .get("/", ctrlr.limits.get.all)
  .get("/:role", ctrlr.limits.get.one)
// UD

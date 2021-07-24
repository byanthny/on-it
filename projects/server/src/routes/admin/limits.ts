import { Router } from "express"
import ctrlr from "../../controllers"

export default Router()
  // C
  .post("/", ctrlr.limits.post.one)
// RUD

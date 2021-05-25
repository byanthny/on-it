import { Router } from "express"
import controllers from "../controllers"

export default Router()
  // C
  .post("/", controllers.task.post.one)
  // R
  .get("/", controllers.task.get.many)
  .get("/:tid", controllers.task.get.one)
  // U
  .patch("/:tid", controllers.task.patch.one)
  // D
  .delete("/:tid", controllers.task.delete.one)

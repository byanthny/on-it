import { Router } from "express"
import controllers from "../controllers"

export default Router()
  // C
  .post("/", controllers.project.post.one)
  // R
  .get("/:pid", controllers.project.get.one)
  .get("/", controllers.project.get.many)
  // U
  .patch("/:pid", controllers.project.patch.one)
  // D
  .delete("/:pid", controllers.project.delete.one)

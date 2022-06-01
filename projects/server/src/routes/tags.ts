import { Router } from "express"
import controllers from "../controllers"

export default Router()
  .post("/", controllers.tags.post.one)
  .get("/:pid", controllers.tags.get.one)
  .get("/", controllers.tags.get.search)
  .patch("/:pid", controllers.tags.patch.one)
  .delete("/:pid", controllers.tags.delete.one)
  .delete("/", controllers.tags.delete.many)
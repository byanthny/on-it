import { Router } from "express"
import controllers from "../controllers"


export default Router()
  // C
  .post("/", controllers.note.post.one)
  // R
  .get("/:nid", controllers.note.get.one)
  .get("/", controllers.note.get.many)
  // U
  .patch("/:nid", controllers.note.patch.one)
  // D
  .patch("/:nid", controllers.note.delete.one)



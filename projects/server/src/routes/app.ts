import { Router } from "express"
import controllers from "../controllers"
import { authentication } from "../middleware"

export const users = Router()
  .post("/register", controllers.user.post.register)
  .post("/login", controllers.user.post.login)
  .post("/logout", authentication(), controllers.user.post.logout)
  .get("/:uid", authentication(), controllers.user.get.one)
  .patch("/:uid", authentication(), controllers.user.patch.one)
  .delete("/:uid", authentication(), controllers.user.delete.one)

export const tags = Router()
  .post("/", controllers.tags.post.one)
  .get("/:pid", controllers.tags.get.one)
  .get("/", controllers.tags.get.search)
  .patch("/:pid", controllers.tags.patch.one)
  .delete("/:pid", controllers.tags.delete.one)
// .delete("/", controllers.tags.delete.many)

export const tasks = Router()
  .post("/", controllers.task.post.one)
  .get("/", controllers.task.get.search)
  .get("/:tid", controllers.task.get.one)
  .patch("/:tid", controllers.task.patch.one)
  .delete("/:tid", controllers.task.delete.one)

export const notes = Router()
  .post("/", controllers.notes.post.one)
  .get("/:nid", controllers.notes.get.one)
  .get("/", controllers.notes.get.many)
  .patch("/:nid", controllers.notes.patch.one)
  .delete("/:nid", controllers.notes.delete.one)

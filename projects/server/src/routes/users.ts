import { Router } from "express"
import controllers from "../controllers"
import { authentication } from "../middleware"


export default Router()
  .post("/register", controllers.user.post.register)
  .post("/login", controllers.user.post.login)
  .get("/:uid", authentication(), controllers.user.get.one)
  .patch("/:uid", authentication(), controllers.user.patch.one)
  .delete("/:uid", authentication(), controllers.user.delete.one)


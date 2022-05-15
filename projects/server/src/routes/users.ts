import { Router } from "express"
import controllers from "../controllers"
import { authentication } from "../middleware"


const router = Router()

router.post("/register", controllers.user.post.register)
router.post("/login", controllers.user.post.login)
router.get("/:uid", authentication(), controllers.user.get.one)
router.patch("/:uid", authentication(), controllers.user.patch.one)
router.delete("/:uid", authentication(), controllers.user.delete.one)

export default router

import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/register", controllers.user.post.register)
router.post("/login", controllers.user.post.login)
// R
router.get("/:uid", controllers.user.get.one)
// U
router.patch("/:uid", requireUser, controllers.user.patch.one)
// D
router.delete("/:uid", requireUser, controllers.user.delete.one)

export default router

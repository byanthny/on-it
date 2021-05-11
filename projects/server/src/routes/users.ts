import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// Auth
router.post("/register", controllers.user.post.register)
router.post("/login", controllers.user.post.login)
// RUD
router.get("/:uid", controllers.user.get.one)
router.patch("/:uid", requireUser, controllers.user.patch.one)
router.delete("/:uid", requireUser, controllers.user.delete.one)

export default router

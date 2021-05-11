import { Router } from "express"
import controllers from "../controllers"

const router = Router()

router.post("/register", controllers.user.post.register)
router.post("/login", controllers.user.post.login)

export default router

import { Router } from "express"
import controllers from "../controllers"

const router = Router()

router.post("/register", controllers.user.post.register)

export default router

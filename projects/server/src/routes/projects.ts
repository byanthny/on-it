import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", requireUser, controllers.project.post.one)
// R
// U
// D

export default router

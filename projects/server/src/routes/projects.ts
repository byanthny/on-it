import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", controllers.project.post.one)
// R
router.get("/:pid", controllers.project.get.one)
// U
// D

export default router

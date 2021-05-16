import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", controllers.task.post.one)
// R
router.get("/:tid", controllers.task.get.one)
// TODO task search
// U
// TODO task update
// D
// TODO task delete

export default router

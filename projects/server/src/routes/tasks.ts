import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", controllers.task.post.one)
// R
router.get("/", controllers.task.get.many)
router.get("/:tid", controllers.task.get.one)
// U
router.patch("/:tid", controllers.task.patch.one)
// D
router.delete("/:tid", controllers.task.delete.one)

export default router

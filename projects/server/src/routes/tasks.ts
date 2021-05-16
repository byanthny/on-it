import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", requireUser, controllers.task.post.one)
// R
router.get("/", requireUser, controllers.task.get.many)
router.get("/:tid", requireUser, controllers.task.get.one)
// U
router.patch("/:tid", requireUser, controllers.task.patch.one)
// D
router.delete("/:tid", requireUser, controllers.task.delete.one)

export default router

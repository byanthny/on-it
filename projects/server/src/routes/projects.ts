import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", requireUser, controllers.project.post.one)
// R
router.get("/:pid", requireUser, controllers.project.get.one)
router.get("/", requireUser, controllers.project.get.many)
// U
router.patch("/:pid", requireUser, controllers.project.patch.one)
// D
router.delete("/:pid", requireUser, controllers.project.delete.one)

export default router

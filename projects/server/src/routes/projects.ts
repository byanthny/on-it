import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", controllers.project.post.one)
// R
router.get("/:pid", controllers.project.get.one)
router.get("/", controllers.project.get.many)
// U
router.patch("/:pid", controllers.project.patch.one)
// D
router.delete("/:pid", controllers.project.delete.one)

export default router

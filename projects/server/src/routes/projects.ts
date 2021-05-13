import { Router } from "express"
import controllers from "../controllers"

const router = Router()

// C
router.post("/", controllers.project.post.one)
// R
router.get("/:pid", controllers.project.get.one)
// TODO project search
// U
router.patch("/:pid", controllers.project.patch.one)
// D
router.delete("/:pid", controllers.project.delete.one)

export default router

import { Router } from "express"
import controllers from "../controllers"

const router = Router()

// C
router.post("/", controllers.note.post.one)
// R
router.get("/:nid", controllers.note.get.one)
router.get("/", controllers.note.get.many)
// U
router.patch("/:nid", controllers.note.patch.one)
// D
router.patch("/:nid", controllers.note.delete.one)

export default router

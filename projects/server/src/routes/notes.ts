import { Router } from "express"
import controllers from "../controllers"
import { requireUser } from "../middleware"

const router = Router()

// C
router.post("/", requireUser, controllers.note.post.one)
// R
router.get("/:nid", requireUser, controllers.note.get.one)
router.get("/", requireUser, controllers.note.get.many)
// U
router.patch("/:nid", requireUser, controllers.note.patch.one)
// D
router.patch("/:nid", requireUser, controllers.note.delete.one)

export default router

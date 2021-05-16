import {Router} from "express"
import controllers from "../controllers"

const router = Router()

// C
router.post("/", controllers.note.post.one)
// RUD

export default router

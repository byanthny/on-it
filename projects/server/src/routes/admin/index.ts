import { UserRole } from "common/src/User"
import { Router } from "express"
import { requireRole } from "../../middleware/auth"
import limits from "./limits"

export default Router().use(requireRole(UserRole.ADMIN)).use("/limits", limits)

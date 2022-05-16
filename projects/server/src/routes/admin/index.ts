import { UserRole } from "common"
import { Router } from "express"
import { authentication } from "../../middleware/auth"
import limits from "./limits"


export default Router().use(authentication(UserRole.ADMIN)).use("/limits", limits)

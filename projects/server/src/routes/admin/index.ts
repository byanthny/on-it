import { Router } from "express"
import limits from "./limits"

export default Router().use("/limits", limits)

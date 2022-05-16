import { ID } from "./Model"

/** Entities which can be nested within a Task */
type Nestable = { parent?: ID }

export type NestableSearch = { parent?: ID }

export default Nestable

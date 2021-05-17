import Joi from "joi"
import { idSchema, ID } from "./Model"
import Project from "./Project"

export const taggableSchema = {
  tags: Joi.array()
    .items(idSchema, Joi.object({ id: idSchema }).unknown(true))
    .custom((value) => {
      let out: string[] = []
      if (value.length > 0) {
        for (const v of value) {
          out.push(typeof v !== "string" ? v.id : v)
        }
        return out
      }
    })
    .optional(),
}

export type TaggableSearch = { tags?: ID[] }

type Taggable<T = Project> = {
  tags?: T[]
}

export default Taggable

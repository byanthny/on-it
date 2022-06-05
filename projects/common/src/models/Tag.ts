import Joi from "joi"
import { ID, idSchema } from "./Model"
import { SearchOptions, searchOptionSchema } from "../Net"
import { nameSchema } from "./name"

export const tagSchema = {
  name: Joi.string().regex(/^[A-Za-z][A-Za-z0-9_\-\s]{0,13}$/),
  color: Joi.string()
    .regex(/^([A-Fa-f\d]{6}|[A-Fa-f\d]{3})$/)
    .optional(),
}

export type Tag = {
  _id: ID
  uid: ID
  name: string
  color?: string
}

export type TagSearch = SearchOptions & {
  uid?: string
  name?: string
}

export const tagSearchSchema = {
  ...searchOptionSchema,
  uid: idSchema.optional(),
  name: nameSchema.optional(),
}

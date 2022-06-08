import Joi from "joi"
import { ID, idSchema, nameSchema } from "./Model"
import { SearchOptions, searchOptionSchema } from "../Net"

export const tagSchema = {
  name: nameSchema,
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

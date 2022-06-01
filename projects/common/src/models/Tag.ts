import Joi from "joi"
import { ID } from "./Model"

export const tagSchema = {
  name: Joi.string().regex(/^[A-Za-z][A-Za-z0-9_\-\s]{0,13}$/),
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
}

export type Tag = {
  _id: ID
  uid: ID
  name: string
  color?: string
}



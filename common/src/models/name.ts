import Joi from "joi"

export const nameSchema = Joi.string()
  .min(1)
  .max(14)
  .regex(/^[A-Za-z][A-Za-z0-9_\-]{0,13}$/)

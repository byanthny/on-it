import Joi from "joi"
import { UserRole } from "./User"
import { Snowflake } from "./Model"

export const limitsSchema = {
  role: Joi.string()
    .valid(...Object.keys(UserRole))
    .required(),
  tags: Joi.object({
    max: Joi.number().integer().min(0).optional(),
  }).optional(),
  tasks: Joi.object({
    max: Joi.number().integer().min(0).optional(),
    maxProjects: Joi.number().integer().min(0).optional(),
    maxNotes: Joi.number().integer().min(0).optional(),
  }).optional(),
  notes: Joi.object({
    maxLength: Joi.number().integer().min(0).optional(),
  }).optional(),
}

/**
 * Defines entity count limits for a specific {@link UserRole}
 */
export type Limits = Snowflake & {
  /** The {@link UserRole} which this {@link Limits} applies to */
  readonly role: UserRole
  readonly tags?: {
    readonly max?: number
  }
  readonly tasks?: {
    readonly max?: number
    /** Max number of Projects a Task can have */
    readonly maxProjects?: number
    /** Max number of Notes a Task can have */
    readonly maxNotes?: number
  }
  readonly notes?: {
    readonly maxLength?: number
  }
}



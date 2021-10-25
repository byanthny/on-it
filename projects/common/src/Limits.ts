import Joi from "joi"
import { UserRole } from "./User"

export const limitsSchema = {
  role: Joi.string()
    .valid(...Object.keys(UserRole))
    .required(),
  projects: Joi.object({
    max: Joi.number().integer().min(0).optional(),
  }).optional(),
  tasks: Joi.object({
    max: Joi.number().integer().min(0).optional(),
    maxProjects: Joi.number().integer().min(0).optional(),
    maxNotes: Joi.number().integer().min(0).optional(),
  }).optional(),
}

/**
 * Defines entity count limits for a specific {@link UserRole}
 */
type Limits = {
  readonly id: String
  /** The {@link UserRole} which this {@link Limits} applies to */
  readonly role: UserRole
  readonly projects: {
    readonly max: number
  }
  readonly tasks: {
    readonly max: number
    /** Max number of Projects a Task can have */
    readonly maxProjects: number
    /** Max number of Notes a Task can have */
    readonly maxNotes: number
  }
  // Maximum number of notes is (task.max * tasks.maxNotes)
}

export default Limits

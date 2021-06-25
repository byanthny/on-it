import { UserRole } from "./User"

/**
 * Defines entity count limits for a specific {@link UserRole}
 */
export type Limits = {
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
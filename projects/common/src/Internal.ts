export type Limits = {
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
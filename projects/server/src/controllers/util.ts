import { Nestable, ID, Project, Taggable } from "common"
import dao from "../dao"
import ApiError from "../errors"

export const populateTaggable = async (
  task: Taggable<ID>,
): Promise<Taggable> => {
  let projects: Project[] = []
  if (task.tags) {
    projects = await Promise.all(task.tags.map(dao.projects.getByID))
  }
  return { ...task, tags: projects }
}

export const populateTaggables = async (
  tasks: Taggable<ID>[],
): Promise<Taggable[]> => {
  const out: Taggable[] = []
  for (const task of tasks) {
    let projects: Project[] = []
    if (task.tags) {
      projects = await Promise.all(task.tags.map(dao.projects.getByID))
    }
    out.push({ ...task, tags: projects })
  }
  return out
}

/** Ensures a {@link Taggable}'s tags exist */
export const validateTags = async ({ tags }: Taggable<ID>) => {
  if (!tags) return
  for (const pid of tags) {
    const exists = await dao.projects.existsByID(pid)
    if (!exists) ApiError.NotFound(`Project Tag with ID ${pid} not found`)
  }
}

/** Ensures a {@link Nestable}'s parent exists */
export const validateParent = async ({ parent }: Nestable, selfID?: ID) => {
  if (!parent) return
  const exists = await dao.tasks.existsByID(parent)
  if (!exists) ApiError.NotFound(`Parent task with ID ${parent} not found`)
  else if (selfID && parent === selfID) {
    ApiError.MalformedContent("Nestable tyeps cannot be their own parent")
  }
}

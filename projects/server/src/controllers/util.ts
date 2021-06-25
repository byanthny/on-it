import { Nestable, ID, Project, Taggable } from "common"
import dao from "../dao"
import ApiError from "../ApiError"
import logger from "winston"

export const populateTaggable = async (
  task: Taggable<ID>,
): Promise<Taggable> => {
  const projects: Project[] = []
  if (task.tags) {
    for (const t of task.tags) {
      try {
        const p = await dao.projects.get(t)
        projects.push(p)
      } catch (error) {
        logger.info(error.message, error)
      }
    }
  }
  return { ...task, tags: projects }
}

export const populateTaggables = async (
  taggables: Taggable<ID>[],
): Promise<Taggable[]> => {
  const out: Taggable[] = []
  for (const t of taggables) {
    const n = await populateTaggable(t)
    out.push(n)
  }
  return out
}

/** Ensures a {@link Taggable}'s tags exist */
export const validateTags = async ({ tags }: Taggable<ID>) => {
  if (!tags) return
  for (const pid of tags) {
    const exists = await dao.projects.exists(pid)
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

import { Request, Response } from "../../types/express"
import joi from "joi"
import { Task, taskSchema, UserRole } from "common"
import ApiError from "../../ApiError"
import db from "../../db"
import { populateTaggable, validateParent, validateTags } from "../util"
import logger from "winston"

export const one = async ({ body, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: tasks create one")

  // Validate
  const { value, error } = joi.object(taskSchema)
    .validate(body, { stripUnknown: true })

  if (error) ApiError.MalformedContent(error.message)

  const preTask = value as Task
  // Validate parent
  await validateParent(preTask)

  // check limits
  const limit = await db.limits.get(user.role || UserRole.GENERIC)
  const count = await db.tasks.search({ uid: user._id }, { limit: limit.tasks.max })

  if (count.length >= limit.tasks.max) {
    ApiError.MalformedContent(`max tasks reached ${ limit.tasks.max }`)
  }

  if ((preTask.tags?.length || []) >= limit.tasks.maxProjects) {
    ApiError.MalformedContent(
      `task has too many projects (${ preTask.tags.length / limit.tasks.maxProjects }`,
    )
  }

  // Validate Tags references
  await validateTags(preTask)

  // Create
  const newTask = await db.tasks.create({ ...preTask, uid: user._id! })

  const task = await populateTaggable(newTask)

  pack(task)
}

import { Request, Response } from "../../types/express"
import joi from "joi"
import { Task, taskSchema, ID, UserRole } from "common"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { populateTaggable, validateParent, validateTags } from "../util"
import logger from "winston"


export const one = async ({ body, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: tasks create one")

  // Validate
  const { value, error } = joi.object(taskSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const preTask = value as Task<ID>
  // Validate parent
  await validateParent(preTask)

  // check limits
  const limit = await dao.limits.get(user.role || UserRole.GENERIC)
  const count = await dao.tasks.count(user.id!)

  if (count >= limit.tasks.max) {
    ApiError.MalformedContent(`max tasks reached ${ limit.tasks.max }`)
  }

  if ((preTask.tags?.length || []) >= limit.tasks.maxProjects) {
    ApiError.MalformedContent(
      `task has too many projects (${ preTask.tags.length / limit.tasks.maxProjects }`,
    )
  }

  // Validate Project references
  await validateTags(preTask)

  // Create
  const newTask = await dao.tasks.create({ ...preTask, uid: user.id! })

  const task = await populateTaggable(newTask)

  pack(task)
}

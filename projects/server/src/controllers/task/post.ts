import { Request, Response } from "../../types/express"
import { object } from "joi"
import { Task, taskSchema, ID } from "common"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { populateTaggable, validateParent, validateTags } from "../util"
import logger from "winston"

export const one = async ({ body, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: tasks create one")

  // Validate
  const { value, error } = object(taskSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  // Relational Validation
  const preTask = value as Task<ID>
  // Validate Project references
  await validateTags(preTask)
  // Validate parent
  await validateParent(preTask)

  // Create
  const newTask = await dao.tasks.create({ ...preTask, uid: user.id! })

  const task = await populateTaggable(newTask)

  pack(task)
}

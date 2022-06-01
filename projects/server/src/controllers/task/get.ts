import { Request, Response } from "../../types/express"
import Joi from "joi"
import { idSchema, TaskState } from "common"
import ApiError from "../../ApiError"
import dao from "../../db"
import { populateTaggable, populateTaggables } from "../util"
import logger from "winston"

export const one = async ({ params, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: task get one")

  // Get task
  const task = await dao.tasks.getByID(params.tid!)

  // validate ownership
  if (user.id! !== task.uid!) {
    ApiError.Authorization("only owners can access their tasks")
  }

  const out = await populateTaggable(task)

  pack(out)
}

export const many = async ({ query, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: task get many", { query })

  const { value, error } = Joi.object({
    parent: idSchema.optional(),
    state: Joi.string()
      .valid(TaskState.TODO, TaskState.CANCELLED, TaskState.DONE)
      .optional(),
    tags: Joi.string()
      .trim()
      .regex(/^\d+(,\d+)*$/)
      .custom((value: string) => value.split(",").filter((s) => s.length > 0))
      .optional(),
  }).validate(query, { stripUnknown: true })

  if (error) ApiError.MalformedContent(error.message)

  const searchResult = await dao.tasks.search(user.id!, value)

  const tasks = await populateTaggables(searchResult)

  pack(tasks)
}

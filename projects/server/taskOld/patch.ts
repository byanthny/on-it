import { Request, Response } from "../src/types/express"
import joi from "joi"
import { Task, taskSchema, ID } from "common"
import ApiError from "../src/ApiError"
import dao from "../../dao"
import { populateTaggable, validateParent, validateTags } from "../util"
import logger from "winston"

export const one = async (
  { user, body, params: { tid } }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: tasks update one")

  // get task
  const oldTask = await dao.tasks.getByID(tid)

  // Verify
  if (oldTask.uid !== user.id!) ApiError.Authorization()

  // Validate
  const { value, error } = joi.object(taskSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  // Relational Validation
  const preTask = value as Task<ID>
  // Validate Tags references
  await validateTags(preTask)
  // Validate parent
  await validateParent(preTask, tid)

  const newTask = await dao.tasks.update(tid, { ...preTask, uid: user!.id! })

  const task = await populateTaggable(newTask)

  pack(task)
}

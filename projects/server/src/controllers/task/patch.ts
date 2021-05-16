import { Request, Response } from "../../types/express"
import { object } from "joi"
import { Task, taskSchema, ID } from "common"
import ApiError from "../../errors"
import dao from "../../dao"
import { populateTask } from "./util"
import logger from "winston"

export const one = async (
  { user, body, params: { tid } }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: tasks create one")

  const { value, error } = object(taskSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  // Relational Validation
  const preTask = value as Task<ID>
  // Validate Project references
  if (preTask.tags) {
    for (const pid of preTask.tags) {
      const exists = await dao.projects.existsByID(pid)
      if (!exists) ApiError.NotFound(`Project Tag with ID ${pid} not found`)
    }
  }
  // Validate parent
  if (preTask.parent) {
    const exists = await dao.tasks.existsByID(preTask.parent!)
    if (!exists) {
      ApiError.NotFound(`Parent task with ID ${preTask.parent} not found`)
    } else if (preTask.parent === tid) {
      ApiError.MalformedContent("Task cannot be it's own parent")
    }
  }

  const newTask = await dao.tasks.update(tid, { ...preTask, uid: user!.id! })

  const task = await populateTask(newTask)

  pack(task)
}

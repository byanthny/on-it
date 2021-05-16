import { Request, Response } from "../../types/express"
import { object } from "joi"
import { Task, taskSchema, ID } from "common"
import ApiError from "../../errors"
import dao from "../../dao"
import { populateTask } from "./util"
import logger from "winston"

export const one = async ({ params, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: task get one")

  // Get task
  const task = await dao.tasks.getByID(params.tid!)

  // validate ownership
  if (user.id! !== task.uid!) {
    ApiError.Authorization("only owners can access their tasks")
  }

  const out = await populateTask(task)

  pack(out)
}

export const many = async ({ query, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: task get many", { query })
}

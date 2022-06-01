import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../db"

/** Deletes a task and all entities with it marked as it's parent */
export const one = async (
  { user, params: { tid } }: Request,
  { pack }: Response,
) => {
  // get task
  let task = await dao.tasks.get({ _id: tid })

  // confirm ownership
  if (task !== user.id!) ApiError.Authorization()

  const tasksDeleted = await dao.tasks.delete({ parents: tid })

  // delete
  task = await dao.tasks.delete(tid)

  pack("task, all subtasks, and all subnotes deleted")
}

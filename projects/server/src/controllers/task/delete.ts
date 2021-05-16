import { Request, Response } from "../../types/express"
import { ID, Task } from "common"
import ApiError from "../../errors"
import dao from "../../dao"
import logger from "winston"

const deleteTree = async (task: Task<ID>) => {
  // TODO get all child notes delete
  // const subnotes = await dao.notes.searchForNote(task.uid, {parent: task.id})

  // get all child tasks
  const subtasks = await dao.tasks.searchForTask(task.uid, { parent: task.id })
  for (const sub of subtasks) {
    // walk the subtree
    await deleteTree(sub)
    // delete task
    await dao.tasks.delete(sub.id)
  }
}

/** Deletes a task and all entities with it marked as it's parent */
export const one = async (
  { user, params: { tid } }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: task delete one")
  // get task
  let task = await dao.tasks.getByID(tid)

  // confirm ownership
  if (task.uid !== user.id!) ApiError.Authorization()

  // delete all child tasks and notes
  await deleteTree(task)

  // delete
  task = await dao.tasks.delete(tid)

  pack("task, all subtasks, and all subnotes deleted")
}

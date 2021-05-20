import { Request, Response } from "../../types/express"
import { ID, Task } from "common"
import ApiError from "../../errors"
import dao from "../../dao"
import logger from "winston"

const deleteTree = async (task: Task<ID>) => {
  // get all child notes delete
  const subnotes = await dao.notes.search(task.uid, { parent: task.id })
  for (const sub of subnotes) {
    logger.debug("task delete note child", sub)
    await dao.notes.delete(sub.id)
  }

  // get all child tasks
  const subtasks = await dao.tasks.search(task.uid, { parent: task.id })
  for (const sub of subtasks) {
    // walk the subtree
    await deleteTree(sub)
    // delete task
    logger.debug("task delete task child", sub)
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
  let retry = 3
  while (retry > 0)
    try {
      await deleteTree(task)
      retry = 0
    } catch (error) {
      retry--
      logger.error("Task Delete Tree Failed", { retry, error })
    }

  // delete
  task = await dao.tasks.delete(tid)

  pack("task, all subtasks, and all subnotes deleted")
}

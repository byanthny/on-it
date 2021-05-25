import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import ApiError from "../../errors"

export const one = async (
  { params: { uid }, user }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: user delete one")

  // Verify
  if (uid !== user.id!) ApiError.Authorization()

  // delete
  await dao.users.delete(uid)

  // get all projects and delete
  const projects = await dao.projects.search(uid, {})

  for (const { id: pid } of projects) {
    try {
      await dao.projects.delete(pid)
    } catch (error) {
      logger.error(`Failed to delete project ${pid}`, error)
    }
  }

  // get all tasks and delete
  const tasks = await dao.tasks.search(uid, {})

  for (const { id: tid } of tasks) {
    try {
      await dao.tasks.delete(tid)
    } catch (error) {
      logger.error(`Failed to delete task ${tid}`, error)
    }
  }

  // get all notes and delete
  const notes = await dao.notes.search(uid, {})

  for (const { id: nid } of notes) {
    try {
      await dao.notes.delete(nid)
    } catch (error) {
      logger.error(`Failed to delete note ${nid}`, error)
    }
  }

  pack("User deleted")
}

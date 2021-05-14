import { Task, ID, Project } from "common"
import dao from "../../dao"

export const populateTask = async (task: Task<ID>): Promise<Task> => {
  let projects: Project[] = []
  if (task.tags) {
    projects = await Promise.all(task.tags.map(dao.projects.getByID))
  }
  return { ...task, tags: projects }
}

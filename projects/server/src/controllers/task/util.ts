import { Task, ID, Project } from "common"
import dao from "../../dao"

export const populateTask = async (task: Task<ID>): Promise<Task> => {
  let projects: Project[] = []
  if (task.tags) {
    projects = await Promise.all(task.tags.map(dao.projects.getByID))
  }
  return { ...task, tags: projects }
}

export const populateTasks = async (tasks: Task<ID>[]): Promise<Task[]> => {
  const out: Task[] = []
  for (const task of tasks) {
    let projects: Project[] = []
    if (task.tags) {
      projects = await Promise.all(task.tags.map(dao.projects.getByID))
    }
    out.push({ ...task, tags: projects })
  }
  return out
}

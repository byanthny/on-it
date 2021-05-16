import { apiRequest, axios } from "./axios"
import { ID, Project, Task, TaskSearch } from "common"

export const createTask = async (
  token: string,
  task: Task<ID | Project>,
): Promise<Task> =>
  apiRequest(axios.post(`/tasks`, task, { headers: { token } }))

export const getTask = async (token: string, tid: ID): Promise<Task> =>
  apiRequest(axios.get(`/tasks/${tid}`, { headers: { token } }))

export const searchTask = async (
  token: string,
  search: TaskSearch,
): Promise<Task[]> =>
  apiRequest(
    axios.get(`/tasks`, {
      params: { tags: search.tags?.join(","), ...search },
      headers: { token },
    }),
  )

export const updateTask = async (
  token: string,
  tid: ID,
  task: Partial<Task<Project | ID>>,
): Promise<Task> =>
  apiRequest(axios.patch(`/tasks/${tid}`, task, { headers: { token } }))

export const deleteTask = async (token: string, tid: ID): Promise<string> =>
  apiRequest(axios.delete(`/tasks/${tid}`, { headers: { token } }))

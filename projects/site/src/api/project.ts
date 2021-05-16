import { apiRequest, axios } from "./axios"
import { ID, Project } from "common"

export const createProject = async (
  token: string,
  name: string,
  color?: string,
): Promise<Project> =>
  apiRequest<Project>(
    axios.post("/projects", { name, color }, { headers: { token } }),
  )

export const getProject = async (token: string, pid: ID): Promise<Project> =>
  apiRequest<Project>(axios.get(`projects/${pid}`, { headers: { token } }))

// TODO project search

export const updateProject = async (
  token: string,
  pid: ID,
  project: Partial<Project>,
): Promise<Project> =>
  apiRequest(axios.patch(`/projects/${pid}`, project, { headers: { token } }))

export const deleteProject = async (token: string, pid: ID): Promise<string> =>
  apiRequest(axios.delete(`/projects/${pid}`, { headers: { token } }))

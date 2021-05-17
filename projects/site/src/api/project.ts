import { apiRequest, axios } from "./axios"
import { ID, Project, ProjectSearch } from "common"

export const createProject = async (
  token: string,
  name: string,
  color?: string,
): Promise<Project> =>
  apiRequest(axios.post("/projects", { name, color }, { headers: { token } }))

export const getProject = async (token: string, pid: ID): Promise<Project> =>
  apiRequest(axios.get(`projects/${pid}`, { headers: { token } }))

export const searchProject = async (
  token: string,
  search: ProjectSearch,
): Promise<Project[]> =>
  apiRequest(axios.get(`/projects`, { params: search, headers: { token } }))

export const updateProject = async (
  token: string,
  pid: ID,
  project: Partial<Project>,
): Promise<Project> =>
  apiRequest(axios.patch(`/projects/${pid}`, project, { headers: { token } }))

export const deleteProject = async (token: string, pid: ID): Promise<string> =>
  apiRequest(axios.delete(`/projects/${pid}`, { headers: { token } }))

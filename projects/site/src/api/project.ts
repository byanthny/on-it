import { apiRequest, axios } from "./axios"
import { Project } from "common"

export const createProject = async (
  token: string,
  name: string,
  color?: string,
): Promise<Project> =>
  apiRequest<Project>(
    axios.post("/projects", { name, color }, { headers: { token } }),
  )

export const getProject = async (
  token: string,
  pid: string,
): Promise<Project> =>
  apiRequest<Project>(axios.get(`projects/${pid}`, { headers: { token } }))

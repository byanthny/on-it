import { ID, Note, Project } from "common"
import { apiRequest, axios } from "./axios"

export const createNote = async (
  token: string,
  note: Note<Project | ID>,
): Promise<Note> =>
  apiRequest(axios.post(`/notes`, note, { headers: { token } }))

export const getNote = async (token: string, nid: ID): Promise<Note> =>
  apiRequest(axios.get(`/notes/${nid}`, { headers: { token } }))

// TODO export const searchNote

export const updateNote = async (
  token: string,
  nid: ID,
  note: Partial<Note<Project | ID>>,
): Promise<Note> =>
  apiRequest(axios.patch(`/notes/${nid}`, note, { headers: { token } }))

export const deleteNote = async (token: string, nid: ID): Promise<string> =>
  apiRequest(axios.delete(`/notes/${nid}`, { headers: { token } }))

import axios, { AxiosResponse } from "axios"
import {
  ApiResponse,
  ID,
  Note,
  NoteSearch,
  Tag,
  TagSearch,
  Task,
  TaskSearch,
  User,
} from "common"

const API_URI = process.env.NODE_ENV.toUpperCase() === "PRODUCTION"
  ? "https://on-it-api.herokuapp.com/api"
  : "http://127.0.0.1:7100/api"

const client = axios.create({
  baseURL: API_URI,
  headers: { "Content-Type": "application/json" },
  validateStatus: (status) => status > 0,
})

export default class OnItApi {
  /** Handle an Axios request invocation */
  private static async request<T>(
    request: Promise<AxiosResponse<ApiResponse<T>>>,
  ): Promise<ApiResponse<T>> {
    return (await request).data
  }

  static register(email: string, password: string): Promise<ApiResponse<User>> {
    return this.request(client.post("/users/register", { email, password }))
  }

  static login(email: string, password: string): Promise<ApiResponse<User>> {
    return this.request(client.post("/users/login", { email, password }))
  }

  readonly user = {
    get: (uid: ID): Promise<ApiResponse<User>> => {
      return OnItApi.request(client.get(`/users/${ uid }`))
    },
    update: (uid: ID, user: Partial<User>): Promise<ApiResponse<User>> => {
      return OnItApi.request(client.patch(`/users/${ uid }`, user))
    },
    delete: (uid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(client.delete(`/users/${ uid }`))
    },
  }

  readonly tag = {
    create: (name: string, color?: string): Promise<ApiResponse<Tag>> => {
      return OnItApi.request(client.post("/tags", { name, color }))
    },
    get: (pid: ID): Promise<ApiResponse<Tag>> => {
      return OnItApi.request(client.get(`tags/${ pid }`))
    },
    search: (search: TagSearch): Promise<ApiResponse<Tag[]>> => {
      return OnItApi.request(client.get(`/tags`, { params: search }))
    },
    update: async (pid: ID, project: Partial<Tag>): Promise<ApiResponse<Tag>> => {
      return OnItApi.request(client.patch(`/tags/${ pid }`, project))
    },
    delete: (pid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(client.delete(`/tags/${ pid }`))
    },
  }

  readonly task = {
    create: (task: Task): Promise<ApiResponse<Task>> => {
      return OnItApi.request(client.post(`/tasks`, task))
    },
    get: (tid: ID): Promise<ApiResponse<Task>> => {
      return OnItApi.request(client.get(`/tasks/${ tid }`))
    },
    search: (search: TaskSearch): Promise<ApiResponse<Task[]>> => {
      return OnItApi.request(client.get(`/tasks`, { params: search }))
    },
    update: (tid: ID, task: Partial<Task>): Promise<ApiResponse<Task>> => {
      return OnItApi.request(client.patch(`/tasks/${ tid }`, task))
    },
    delete: (tid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(client.delete(`/tasks/${ tid }`))
    },
  }

  readonly note = {
    create: (note: Note): Promise<ApiResponse<Note>> => {
      return OnItApi.request(client.post(`/notes`, note))
    },
    get: (nid: ID): Promise<ApiResponse<Note>> => {
      return OnItApi.request(client.get(`/notes/${ nid }`))
    },
    search: (search: NoteSearch): Promise<ApiResponse<Note[]>> => {
      return OnItApi.request(client.get(`/notes`, { params: search }))
    },
    update: (nid: ID, note: Partial<Note>): Promise<ApiResponse<Note>> => {
      return OnItApi.request(client.patch(`/notes/${ nid }`, note))
    },
    delete: (nid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(client.delete(`/notes/${ nid }`))
    },
  }
}

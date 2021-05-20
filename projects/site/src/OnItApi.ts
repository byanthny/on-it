import axios, { AxiosInstance, AxiosResponse } from "axios"
import {
  ApiResponse,
  ID,
  Note,
  Project,
  ProjectSearch,
  Task,
  TaskSearch,
  User,
} from "common"
import { NoteSearch } from "common/src/Note"

const API_URI = `http://${
  process.env.NODE_ENV === "production"
    ? "on-it-api.herokuapp.com"
    : "127.0.0.1:7000"
}/api`

type AuthResponse = { user: User; token: string }

export class OnItApi {
  private static anonClient = axios.create({
    baseURL: API_URI,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: (status) => {
      return status > 0
    },
  })
  private client: AxiosInstance
  private token: string

  constructor(token: string) {
    this.token = token
    this.client = axios.create({
      baseURL: API_URI,
      headers: {
        "Content-Type": "application/json",
        token: this.token,
      },
      validateStatus: (status) => {
        return status > 0
      },
    })
  }

  /** Handle an Axios request invocation */
  private static async request<T>(
    request: Promise<AxiosResponse<ApiResponse<T>>>,
  ) {
    const {
      data: { payload, error },
    } = await request
    if (error) throw new Error(error)
    return payload!
  }

  static register(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(
      this.anonClient.post("/users/register", {
        email,
        password,
      }),
    )
  }

  /** @param identity - display-name or email */
  static login(identity: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(
      this.anonClient.post("/users/login", { identity, password }),
    )
  }

  readonly user = {
    get: (uid: ID): Promise<User> => {
      return OnItApi.request(this.client.get(`/users/${uid}`))
    },
    update: (uid: ID, user: Partial<User>): Promise<User> => {
      return OnItApi.request(this.client.patch(`/users/${uid}`, user))
    },
    delete: (uid: ID): Promise<string> => {
      return OnItApi.request(this.client.delete(`/users/${uid}`))
    },
  }

  readonly project = {
    create: (name: string, color?: string): Promise<Project> => {
      return OnItApi.request(this.client.post("/projects", { name, color }))
    },
    get: (pid: ID): Promise<Project> => {
      return OnItApi.request(this.client.get(`projects/${pid}`))
    },
    search: (search: ProjectSearch): Promise<Project[]> => {
      return OnItApi.request(this.client.get(`/projects`, { params: search }))
    },
    updateProject: async (
      pid: ID,
      project: Partial<Project>,
    ): Promise<Project> => {
      return OnItApi.request(this.client.patch(`/projects/${pid}`, project))
    },
    delete: (pid: ID): Promise<string> => {
      return OnItApi.request(this.client.delete(`/projects/${pid}`))
    },
  }

  readonly task = {
    create: (task: Task<ID | Project>): Promise<Task> => {
      return OnItApi.request(this.client.post(`/tasks`, task))
    },
    get: (tid: ID): Promise<Task> => {
      return OnItApi.request(this.client.get(`/tasks/${tid}`))
    },
    search: (search: TaskSearch): Promise<Task[]> => {
      return OnItApi.request(
        this.client.get(`/tasks`, {
          params: { tags: search.tags?.join(","), ...search },
        }),
      )
    },
    update: (tid: ID, task: Partial<Task<Project | ID>>): Promise<Task> => {
      return OnItApi.request(this.client.patch(`/tasks/${tid}`, task))
    },
    delete: (tid: ID): Promise<string> => {
      return OnItApi.request(this.client.delete(`/tasks/${tid}`))
    },
  }

  readonly note = {
    create: (note: Note<Project | ID>): Promise<Note> => {
      return OnItApi.request(this.client.post(`/notes`, note))
    },
    get: (nid: ID): Promise<Note> => {
      return OnItApi.request(this.client.get(`/notes/${nid}`))
    },
    search: (search: NoteSearch): Promise<Project[]> => {
      return OnItApi.request(this.client.get(`/notes`, { params: search }))
    },
    update: (nid: ID, note: Partial<Note<Project | ID>>): Promise<Note> => {
      return OnItApi.request(this.client.patch(`/notes/${nid}`, note))
    },
    delete: (nid: ID): Promise<string> => {
      return OnItApi.request(this.client.delete(`/notes/${nid}`))
    },
  }
}

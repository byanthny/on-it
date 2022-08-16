import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  ID,
  Note,
  NoteSearch,
  Tag,
  TagSearch,
  Task,
  TaskSearch,
  TaskState,
  User,
} from "common";

const API_URI =
  process.env.NODE_ENV.toUpperCase() === "PRODUCTION"
    ? "https://on-it-api.herokuapp.com/api"
    : "http://localhost:3500/api";

class OnItApi {
  /** Handle an Axios request invocation */
  private static async request<T>(
    request: Promise<AxiosResponse<ApiResponse<T>>>,
  ): Promise<ApiResponse<T>> {
    return (await request).data;
  }

  private client = axios.create({
    baseURL: API_URI,
    headers: { "Content-Type": "application/json" },
    validateStatus: (status) => status > 0,
    withCredentials: true,
  });

  register(email: string, password: string): Promise<ApiResponse<User>> {
    return OnItApi.request(this.client.post("/users/register", { email, password }));
  }

  login(email: string, password: string): Promise<ApiResponse<User>> {
    return OnItApi.request(this.client.post("/users/login", { email, password }));
  }

  logout(): Promise<ApiResponse<void>> {
    return OnItApi.request(this.client.post("/users/logout"));
  }

  readonly user = {
    get: (uid: ID): Promise<ApiResponse<User>> => {
      return OnItApi.request(this.client.get(`/users/${uid}`));
    },
    update: (uid: ID, user: Partial<User>): Promise<ApiResponse<User>> => {
      return OnItApi.request(this.client.patch(`/users/${uid}`, user));
    },
    delete: (uid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(this.client.delete(`/users/${uid}`));
    },
  };

  readonly tag = {
    create: (name: string, color?: string): Promise<ApiResponse<Tag>> => {
      return OnItApi.request(this.client.post("/tags", { name, color }));
    },
    get: (pid: ID): Promise<ApiResponse<Tag>> => {
      return OnItApi.request(this.client.get(`tags/${pid}`));
    },
    search: (search: TagSearch): Promise<ApiResponse<Tag[]>> => {
      return OnItApi.request(this.client.get(`/tags`, { params: search }));
    },
    update: async (pid: ID, project: Partial<Tag>): Promise<ApiResponse<Tag>> => {
      return OnItApi.request(this.client.patch(`/tags/${pid}`, project));
    },
    delete: (pid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(this.client.delete(`/tags/${pid}`));
    },
  };

  readonly task = {
    create: (task: Task): Promise<ApiResponse<Task>> => {
      return OnItApi.request(this.client.post(`/tasks`, task));
    },
    get: (tid: ID): Promise<ApiResponse<Task>> => {
      return OnItApi.request(this.client.get(`/tasks/${tid}`));
    },
    search: (search: TaskSearch): Promise<ApiResponse<Task[]>> => {
      return OnItApi.request(this.client.get(`/tasks`, { params: search }));
    },
    update: (tid: ID, task: Partial<Task>): Promise<ApiResponse<Task>> => {
      return OnItApi.request(this.client.patch(`/tasks/${tid}`, task));
    },
    delete: (tid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(this.client.delete(`/tasks/${tid}`));
    },
  };

  readonly note = {
    create: (note: Note): Promise<ApiResponse<Note>> => {
      return OnItApi.request(this.client.post(`/notes`, note));
    },
    get: (nid: ID): Promise<ApiResponse<Note>> => {
      return OnItApi.request(this.client.get(`/notes/${nid}`));
    },
    search: (search: NoteSearch): Promise<ApiResponse<Note[]>> => {
      return OnItApi.request(this.client.get(`/notes`, { params: search }));
    },
    update: (nid: ID, note: Partial<Note>): Promise<ApiResponse<Note>> => {
      return OnItApi.request(this.client.patch(`/notes/${nid}`, note));
    },
    delete: (nid: ID): Promise<ApiResponse<boolean>> => {
      return OnItApi.request(this.client.delete(`/notes/${nid}`));
    },
  };
}

/* Creates a new Note or Task based on itemType
 * Uses provided data
 * if handleResponse is provided the API payload is provided to that function
 * Otherwise the response is returned
 */
export const createItem = async (
  itemType: string,
  data: (Task & Note & {checked: boolean}),
  handleResponse?: Function,
) => {
  const api = new OnItApi();
  let response;
  if (itemType === "task") {
/*     const task: Task = {
      uid: "",
      title: data.title,
      state: data.checked ? TaskState.DONE : TaskState.TODO,
      description: data.description,
      parent: data.parent,
      tags: data.tags,
      due: data.due,
      reminders: data.reminders,
      pinned: data.pinned
    }; */
    const task: Task = data as Task;
    response = await api.task.create(task);
  } else {

    const temp:Task = await (await api.task.search({})).payload![0]; //Temp workaround till notes are decoupled from task
/*     const note: Note = {
      uid: "",
      parent: temp._id!,
      order: data.order,
      title: data.title,
      text: data.description!,
      tags: [],
      updated: new Date().toISOString(),
    }; */
    const note: Note = data as Note;
    note.updated = new Date().toISOString();
    response = await api.note.create(note);
  }

  if (handleResponse && !response.error) handleResponse(response.payload);

  return response;
};

export default new OnItApi();

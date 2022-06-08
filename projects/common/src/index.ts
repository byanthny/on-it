import {
  User,
  UserRole,
  Tag,
  Task,
  TaskState,
  TagSearch,
  NoteSearch,
  Note,
  ID,
  Limits,
  TaskSearch,
  Schemae as schemas,
} from "./models"
import {
  ApiResponse,
  SearchOptions,
  SearchQuery,
  searchOptionSchema,
  ApiError,
} from "./Net"
import OnIt from "./OnIt"
import { validate } from "./util"

const Schemae = {
  ...schemas,
  search: {
    ...schemas.search,
    options: searchOptionSchema,
  },
}

export {
  OnIt,
  ApiResponse,
  SearchOptions,
  SearchQuery,
  User,
  UserRole,
  Tag,
  Task,
  TaskState,
  TaskSearch,
  NoteSearch,
  Note,
  ID,
  Schemae,
  Limits,
  validate,
  ApiError,
  TagSearch,
}

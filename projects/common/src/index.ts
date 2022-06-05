import {
  User,
  UserRole,
  Tag,
  Task,
  TaskState,
  TagSearch,
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
  Note,
  ID,
  Schemae,
  Limits,
  validate,
  ApiError,
  TagSearch,
}

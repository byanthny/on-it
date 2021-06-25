import {
  ContainsStr,
  Create,
  Delete,
  Exists,
  Filter,
  Get,
  Lambda,
  LowerCase,
  Map,
  Match,
  Paginate,
  Ref,
  Select,
  Update,
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import db from "./root"
import collections from "./collections"
import indexes from "./indexes"
import { ID, Project, ProjectSearch } from "common"
import Dao from "./Dao"

const dao: Dao<Project, ProjectSearch & { uid: ID }> = {
  async create(project) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Project>>(
      Create(collections.projects, { data: project }),
    )
    return { ...data, id }
  },
  async get(pid) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Project>>(Get(Ref(collections.projects, pid)))
    return { ...data, id }
  },
  async exists(pid) {
    return db.query<boolean>(Exists(Ref(collections.projects, pid)))
  },
  async search(search) {
    let expression = Map(
      Paginate(Match(indexes.projects.byUserID, search.uid)),
      Lambda("ref", Get(Var("ref"))),
    )

    if (search.name) {
      expression = Filter(
        expression,
        Lambda(
          "doc",
          ContainsStr(
            LowerCase(Select(["data", "name"], Var("doc"))),
            search.name.toLowerCase(),
          ),
        ),
      )
    }

    const { data } = await db.query<{ data: Document<Project>[] }>(expression)

    return data.map(({ data, ref: { id } }) => ({ ...data, id }))
  },
  async update(pid, project) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Project>>(
      Update(Ref(collections.projects, pid), {
        data: { name: project.name, color: project.name },
      }),
    )
    return { ...data, id }
  },
  async delete(pid) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Project>>(
      Delete(Ref(collections.projects, pid)),
    )
    return { ...data, id }
  },
}

export default dao

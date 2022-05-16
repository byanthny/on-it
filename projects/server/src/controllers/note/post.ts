import { Request, Response } from "../../types/express"
import Joi from "joi"
import { ID, Note, noteSchema, UserRole } from "common"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { populateTaggable, validateParent, validateTags } from "../util"
import logger from "winston"


export const one = async ({ body, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: note create one")

  // validate body
  const { value, error } = Joi.object(noteSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const preNote = value as Note<ID>
  // Validate parent
  await validateParent(preNote)

  // check limits
  const limit = await dao.limits.get(user.role || UserRole.GENERIC)
  const count = await dao.notes.count(preNote.parent)

  if (count >= limit.tasks.maxNotes) {
    ApiError.MalformedContent(`max notes reached ${ limit.tasks.maxNotes }`)
  }

  // Validate Project references
  await validateTags(preNote)

  const newNote = await dao.notes.create({ ...preNote, uid: user.id! })

  const note = await populateTaggable(newNote)

  pack(note)
}

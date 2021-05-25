import { Request, Response } from "../../types/express"
import Joi from "joi"
import { ID, Note, noteSchema } from "common"
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

  // Relationabl validation
  const preNote = value as Note<ID>
  // Validate Project references
  await validateTags(preNote)
  // Validate parent
  await validateParent(preNote)

  const newNote = await dao.notes.create({ ...preNote, uid: user.id! })

  const note = await populateTaggable(newNote)

  pack(note)
}

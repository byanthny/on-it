import { Request, Response } from "../../types/express"
import ApiError from "../../errors"
import dao from "../../dao"
import { populateTaggable, populateTaggables } from "../util"
import logger from "winston"
import Joi from "joi"
import { idSchema, noteSchema } from "common"

export const one = async (
  { user, params: { nid } }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: note get one")

  // get note
  const note = await dao.notes.getByID(nid)
  // confirm ownership
  if (note.uid !== user.id!) ApiError.Authorization()

  // populate tags
  const out = await populateTaggable(note)

  pack(out)
}

export const many = async ({ query, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: note get many", { query })

  // validate
  const { value, error } = Joi.object({
    title: Joi.string().optional(),
    text: noteSchema.text.optional(),
    parent: idSchema.optional(),
    tags: Joi.string()
      .trim()
      .regex(/^\d+(,\d+)*$/)
      .custom((value: string) => value.split(",").filter((s) => s.length > 0))
      .optional(),
  }).validate(query, { stripUnknown: true })

  if (error) ApiError.MalformedContent(error.message)

  const searchResult = await dao.notes.search(user.id!, value)

  const notes = await populateTaggables(searchResult)

  pack(notes)
}

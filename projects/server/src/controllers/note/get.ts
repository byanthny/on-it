import { Request, Response } from "../../types/express"
import ApiError from "../../errors"
import dao from "../../dao"
import { populateTaggable } from "../util"
import logger from "winston"

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
  ApiError.TODO()
}

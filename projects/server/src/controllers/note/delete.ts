import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import logger from "winston"

export const one = async (
  { user, params: { nid } }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: note delete one")

  // get note
  const note = await dao.notes.getByID(nid)

  // Verify
  if (note.uid !== user.id!) ApiError.Authorization()

  await dao.notes.delete(nid)

  pack("Note deleted")
}

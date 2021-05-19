import { Request, Response } from "../../types/express";
import ApiError from "../../errors";
import dao from "../../dao";
import logger from "winston";
import Joi from "joi";
import { ID, Note, noteSchema } from "common";
import { populateTaggable, validateParent, validateTags } from "../util";

export const one = async (
  { user, params: { nid }, body }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: note delete one");

  // get note
  const note = await dao.notes.getByID(nid);

  // Verify
  if (note.uid !== user.id!) ApiError.Authorization();

  await dao.notes.delete(nid);

  pack("Note deleted");
};

import { Request, Response } from "../../types/express";
import Joi from "joi";
import { ID, Note, noteSchema } from "common";
import ApiError from "../../errors";
import dao from "../../dao";
import { populateTaggable, validateParent, validateTags } from "../util";
import logger from "winston";

export const one = async (
  { body, user, params: { nid } }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: note update one");

  // get note
  const note = await dao.notes.getByID(nid);

  // Verify
  if (note.uid !== user.id!) ApiError.Authorization();

  // Validate
  const { value, error } = Joi.object(noteSchema).validate(body, {
    stripUnknown: true,
  });

  if (error) ApiError.MalformedContent(error.message);

  const preNote = value as Partial<Note<ID>>;

  await validateParent(preNote);
  await validateTags(preNote);

  // update
  const newNote = await dao.notes.update(nid, preNote);

  const out = await populateTaggable(newNote);

  pack(out);
};

import { Request, Response } from "../../types/express"
import Joi from "joi"
import { ID, Note, noteSchema } from "common"
import ApiError from "../../errors"
import dao from "../../dao"
import { populateTaggable, validateParent, validateTags } from "../util"
import logger from "winston"

export const one = async ({ body, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: note update one")

  ApiError.TODO()
}

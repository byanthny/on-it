import { object } from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { projectSchema } from "common"

export const one = async ({ user, body }: Request, res: Response) => {
  const { value, error } = object(projectSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const project = await dao.projects.create({ uid: user.id!, ...value })

  res.pack(project)
}

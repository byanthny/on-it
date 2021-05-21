import { Request, Response } from "../../types/express";
import dao from "../../dao";
import logger from "winston";
import ApiError from "../../errors";

export const one = async (
  { params: { uid }, user }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: user delete one");

  // Verify
  if (uid !== user.id!) ApiError.Authorization();

  // delete
  await dao.users.delete(uid);

  pack("User deleted");
};

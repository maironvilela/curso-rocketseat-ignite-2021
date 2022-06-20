import { NextFunction, Request, Response } from "express";

import UsersRepository from "@modules/acount/infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/error/AppError";

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const userRequest = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(userRequest.id);

  if (!user.is_admin) {
    throw new AppError("user isn't admin", 401);
  }
  next();
}

export { ensureAdmin };

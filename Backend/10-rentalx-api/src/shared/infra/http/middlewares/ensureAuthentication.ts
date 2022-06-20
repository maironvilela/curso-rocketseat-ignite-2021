import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import UsersTokensRepository from "@modules/acount/infra/typeorm/repositories/UsersTokensRepository";
import AppError from "@shared/error/AppError";

interface IPayload {
  sub: string;
}

async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { secret_refresh_token } = auth;
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, refresh_token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      refresh_token,
      secret_refresh_token
    ) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndToken(
      user_id,
      refresh_token
    );

    if (!user) {
      throw new AppError("user do not exists", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthentication };

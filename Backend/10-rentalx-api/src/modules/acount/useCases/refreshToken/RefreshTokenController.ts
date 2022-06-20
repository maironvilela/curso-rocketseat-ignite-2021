import { Request, Response } from "express";
import { container } from "tsyringe";

import AppError from "@shared/error/AppError";

import RefreshTokenUseCase from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    if (!token) {
      throw new AppError("Token missing", 401);
    }

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export default RefreshTokenController;

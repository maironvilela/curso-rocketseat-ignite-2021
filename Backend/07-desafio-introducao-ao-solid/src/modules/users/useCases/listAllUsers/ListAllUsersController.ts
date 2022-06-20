import { Request, Response } from "express";
import { User } from "modules/users/model/User";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  private users = [];

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      this.users = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });
    } catch (err) {
      const message = err.message.split(",")[0];
      const code = Number(err.message.split(",")[1]);
      return response.status(code).json({ error: message });
    }

    return response.status(200).json(this.users);
  }
}

export { ListAllUsersController };

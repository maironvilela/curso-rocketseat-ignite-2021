import { Request, Response } from "express";
import { container } from "tsyringe";

import User from "@modules/acount/infra/typeorm/entities/User";
import ListUserUseCase from "./ListUserUseCase";

class ListUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<User[]>> {
    const listUserUseCase = container.resolve(ListUserUseCase);
    const users = await listUserUseCase.execute();

    return response.status(200).json(users);
  }
}

export default ListUserController;

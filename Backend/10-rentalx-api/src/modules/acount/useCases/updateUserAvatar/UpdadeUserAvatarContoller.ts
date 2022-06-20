import { Request, Response } from "express";
import { container } from "tsyringe";

import User from "@modules/acount/infra/typeorm/entities/User";
import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response<User>> {
    const { user, file } = request;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const userUpdated = await updateUserAvatarUseCase.execute({
      user_id: user.id,
      avatar: file.filename,
    });

    return response.json(userUpdated);
  }
}

export default UpdateUserAvatarController;

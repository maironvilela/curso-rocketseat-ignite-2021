import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../shared/utils/file";
import User from "@modules/acount/infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    const oldAvatar = user.avatar;

    user.avatar = avatar;

    const userUpdated = await this.userRepository.create(user);

    if (oldAvatar) {
      await deleteFile(`./tmp/avatar/${oldAvatar}`);
    }

    return userUpdated;
  }
}

export default UpdateUserAvatarUseCase;

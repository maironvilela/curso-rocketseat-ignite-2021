import { inject, injectable } from "tsyringe";

import User from "@modules/acount/infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}

export default ListUserUseCase;

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("user who made a request does not exist, 400");
    } else if (!user.admin) {
      throw new Error("Unauthorized, 401");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

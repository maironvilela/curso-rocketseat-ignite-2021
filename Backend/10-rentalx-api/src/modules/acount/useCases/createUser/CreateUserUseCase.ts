import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/error/AppError";
import User from "@modules/acount/infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  password: string;
  confirmation_password: string;
  email: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<User> {
    const passwordHash = await hash(password, 8);

    const userAlreadExists = await this.usersRepository.findByEmail(email);

    if (userAlreadExists) {
      throw new AppError("Email already exists", 400);
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

    return user;
  }
}
export default CreateUserUseCase;

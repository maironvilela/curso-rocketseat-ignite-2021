import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import ICreateUserDTO from "@modules/acount/dtos/ICreateUserDTO";
import User from "@modules/acount/infra/typeorm/entities/User";

import IUsersRepository from "../../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuidV4(),
      name,
      email,
      password: await hash(password, 8),
      driver_license,
      is_admin: false,
      created_at: new Date(),
      update_at: new Date(),
      avatar: null,
    });

    const index = this.users.push(user);

    return this.users[index - 1];
  }
  async findByName(name: string): Promise<User> {
    const user = this.users.find((user) => user.name === name);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}

export default UsersRepositoryInMemory;

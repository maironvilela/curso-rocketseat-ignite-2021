import { getRepository, Repository } from "typeorm";

import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUSersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";

class UsersRepository implements IUSersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
  async create({
    id,
    name,
    email,
    password,
    avatar,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      avatar,
      driver_license,
    });

    const userSave = await this.repository.save(user);

    return userSave;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        name,
      },
    });

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
  async findAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}
export default UsersRepository;

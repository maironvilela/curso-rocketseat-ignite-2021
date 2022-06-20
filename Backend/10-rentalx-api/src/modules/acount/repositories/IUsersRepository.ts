import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../entities/User";

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User>;

  findByName(name: string): Promise<User>;

  findById(id: string): Promise<User>;

  findAll(): Promise<User[]>;

  findByEmail(email: string): Promise<User>;
}

export default IUsersRepository;

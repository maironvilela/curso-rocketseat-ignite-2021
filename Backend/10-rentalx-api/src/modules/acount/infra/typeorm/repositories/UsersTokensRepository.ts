import { getRepository, Repository } from "typeorm";

import ICreateUserTokensDTO from "@modules/acount/dtos/ICreateUserTokensDTO";
import IUsersTokensRepository from "@modules/acount/repositories/IUsersTokensRepository";

import UserTokens from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    const userTokenSaved = await this.repository.save(userToken);

    return userTokenSaved;
  }

  async findByUserIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const token = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return token;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersTokensRepository;

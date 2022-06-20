import ICreateUserTokensDTO from "../dtos/ICreateUserTokensDTO";
import UserTokens from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUserTokensDTO): Promise<UserTokens>;
  findByUserIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  delete(id: string): Promise<void>;
}

export default IUsersTokensRepository;

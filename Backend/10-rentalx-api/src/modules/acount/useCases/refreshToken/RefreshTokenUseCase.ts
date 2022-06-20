import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import IUsersTokensRepository from "@modules/acount/repositories/IUsersTokensRepository";
import IDateProviders from "@shared/container/providers/DateProviders/models/IDateProviders";
import AppError from "@shared/error/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProviders
  ) {}

  async execute(refresh_token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_day,
    } = auth;

    /* recupera as informação do sub e do email inserido no token */
    const { sub: user_id, email } = verify(
      refresh_token,
      auth.secret_refresh_token
    ) as IPayload;

    const token = await this.usersTokensRepository.findByUserIdAndToken(
      user_id,
      refresh_token
    );

    if (!token) {
      throw new AppError("Refresh Token not found");
    }

    /* Remove o antigo token_refresh */
    await this.usersTokensRepository.delete(token.id);

    const payload = { email };
    const secret = secret_refresh_token;

    const refresh_token_sign = sign(payload, secret, {
      subject: user_id, // sub
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: refresh_token_sign,
      expires_date: this.dateProvider.addDays(expires_refresh_token_day),
    });

    return refresh_token_sign;
  }
}
export default RefreshTokenUseCase;

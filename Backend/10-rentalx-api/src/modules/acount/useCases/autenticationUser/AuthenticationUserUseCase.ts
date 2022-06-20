import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import IUsersTokensRepository from "@modules/acount/repositories/IUsersTokensRepository";
import IDateProviders from "@shared/container/providers/DateProviders/models/IDateProviders";
import AppError from "@shared/error/AppError";

import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };

  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticationUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProviders
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_day,
    } = auth;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail or password incorrect", 401);
    }

    const isAuthorized = await compare(password, user.password);

    if (!isAuthorized) {
      throw new AppError("E-mail or password incorrect", 401);
    }

    const payloadToken = {};
    const secretToken = secret_token;

    const token = sign(payloadToken, secretToken, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    /* Passa-se o email no payload caso for necessário recuperar a informação */
    const payloadRefreshToken = { email };
    const secretRefreshToken = secret_refresh_token;

    const refresh_token = sign(payloadRefreshToken, secretRefreshToken, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(expires_refresh_token_day),
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}

export default AuthenticationUserUseCase;

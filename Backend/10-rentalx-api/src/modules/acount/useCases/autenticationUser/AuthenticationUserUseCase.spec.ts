import UsersRepositoryInMemory from "@modules/acount/repositories/implementations/inMemory/UsersRepositoryInMemory";
import IUsersRepository from "@modules/acount/repositories/IUsersRepository";
import AppError from "@shared/error/AppError";

import AuthenticationUserUseCase from "./AuthenticationUserUseCase";

describe("Authentication user", () => {
  const user = {
    name: "User",
    email: "user@email.com",
    password: "123456",
    driver_license: "253688963258",
    is_admin: false,
    created_at: new Date(),
    update_at: new Date(),
  };

  let usersRepository: IUsersRepository;
  let authenticationUserUseCase: AuthenticationUserUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticationUserUseCase = new AuthenticationUserUseCase(usersRepository);
  });

  it("shold be able authenticate user", async () => {
    await usersRepository.create({
      name: "User",
      email: "user@email.com",
      password: "123456",
      driver_license: "253688963258",
    });

    const email = "user@email.com";

    const password = "123456";

    const result = await authenticationUserUseCase.execute({
      email,
      password,
    });

    expect(result).toHaveProperty("token");
  });

  it("shold not be able authenticate user with incorrect email", async () => {
    await usersRepository.create({
      name: "User",
      email: "user@email.com",
      password: "123456",
      driver_license: "253688963258",
    });

    const email = "invalid_email@email.com";

    const password = "123456";

    await expect(
      authenticationUserUseCase.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shold not be able authenticate user with incorrect password", async () => {
    await usersRepository.create({
      name: "User",
      email: "user@email.com",
      password: "123456",
      driver_license: "253688963258",
    });

    const email = "user@email.com";

    const password = "invalid-password";

    await expect(
      authenticationUserUseCase.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

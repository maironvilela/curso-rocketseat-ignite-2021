import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepository: IUsersRepository

beforeEach(() =>{

  userRepository = new InMemoryUsersRepository();
  authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

})

describe("Authenticate User", () =>{

  it("should be able to authenticate user",async () =>{

    await userRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123", 8)
    })

    const result = await authenticateUserUseCase.execute({
      email: "admin@email.com",
      password:"123"
    })

    expect(result).toHaveProperty("token")
    expect(result).toHaveProperty("user")
    expect(result.user).toHaveProperty("id")
    expect(result.user).toHaveProperty("name")
    expect(result.user).toHaveProperty("email")
    expect(result.user).not.toHaveProperty("password")


  })

  it("should not be able to authenticate user with invalid e-mail",async () =>{


    await expect(authenticateUserUseCase.execute({
      email: "admin@email.com",
      password:"123"
    })).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)

   })

  it("should not be able to authenticate user with invalid password",async () =>{

    await expect(authenticateUserUseCase.execute({
      email: "admin@email.com",
      password:"123"
    })).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)

  })

})

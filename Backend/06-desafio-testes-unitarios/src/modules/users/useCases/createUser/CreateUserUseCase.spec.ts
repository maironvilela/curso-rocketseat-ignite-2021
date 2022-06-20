import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase"
import {CreateUserError} from "./CreateUserError";


let createUserUseCase: CreateUserUseCase;
let repository: IUsersRepository

beforeEach(() =>{
  repository = new InMemoryUsersRepository();
  createUserUseCase = new CreateUserUseCase(repository);
})

describe("Create User", () =>{
  it("should be able to create user", async () =>{

    const user = await  createUserUseCase.execute({
      name: "user 01",
      email: "user@email.com",
      password: "123"
    })


    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("password");
    expect(user.name).toBe("user 01")
    expect(user.email).toBe("user@email.com")



  })

  it("should not be able to create user with existing email ", async () =>{

    await repository.create({
        name: "user 01",
        email: "user@email.com",
        password: "123"
      })

      await expect(
        createUserUseCase.execute({
        name: "user 01",
        email: "user@email.com",
        password: "123"
       })
      ).rejects.toBeInstanceOf(CreateUserError)

  })
})

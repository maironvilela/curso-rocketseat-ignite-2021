import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"


let showUserProfileUseCase: ShowUserProfileUseCase;
let repository: IUsersRepository;

describe("Show User profile Controller", () =>{


beforeAll(async () =>{
  repository = new InMemoryUsersRepository;
  showUserProfileUseCase = new ShowUserProfileUseCase(repository)
})

  it("should be able to load user profile",async () =>{

   const user = await repository.create({
      name:"admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    const profile = await showUserProfileUseCase.execute(user.id as string)


    expect(profile).toHaveProperty("id")
    expect(profile).toHaveProperty("name")
    expect(profile).toHaveProperty("email")
    expect(profile).toHaveProperty("password")
    expect(profile.id).toEqual(user.id)
    expect(profile.email).toEqual("admin@email.com")
    expect(profile.name).toEqual("admin")

  })


  it("should not be able to load user profile with invalid id",async() =>{

    await expect(showUserProfileUseCase.execute("invalid_id")).rejects.toBeInstanceOf(ShowUserProfileError);

  })
})

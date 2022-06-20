import { hash } from "bcryptjs";
import {v4 as uuidV4} from "uuid"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import {CreateStatementUseCase} from "./CreateStatementUseCase"
import { CreateStatementError } from "./CreateStatementError";
import { OperationType } from "../../entities/Statement";



let usersRepository: IUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let statementsRepository: InMemoryStatementsRepository;



describe ("Create Statement Controller", () =>{


  beforeEach(async () =>{
    usersRepository = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository)
  })


  it("Should be able to make a deposit", async () =>{

   const user = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    const user_id = user.id || "";

    const statement = await createStatementUseCase.execute({
      user_id,
      amount: 200,
      description: "deposit",
      type: "deposit" as OperationType,

    })

    expect(statement).toHaveProperty("id")
    expect(statement).toHaveProperty("user_id")
    expect(statement).toHaveProperty("description")
    expect(statement).toHaveProperty("amount")
    expect(statement).toHaveProperty("type")

    expect(statement.user_id).toBe(user.id)
    expect(statement.description).toBe("deposit")
    expect(statement.amount).toBe(200)



  })

  it("Should not be able to make a deposit with invalid user",async () =>{

    await expect(  createStatementUseCase.execute({
      user_id:uuidV4(),
      amount: 200,
      description: "deposit",
      type: "deposit" as OperationType

    })).rejects.toBeInstanceOf(CreateStatementError.UserNotFound)

  })


  it("Should be able to make a withdraw", async () =>{
    const user = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    const user_id = user.id || "";

     await createStatementUseCase.execute({
      user_id,
      amount: 400,
      description: "deposit",
      type: "deposit" as OperationType,

    })

    const statement = await createStatementUseCase.execute({
      user_id,
      amount: 200,
      description: "withdraw",
      type: "withdraw" as OperationType,

    })

    expect(statement).toHaveProperty("id")
    expect(statement).toHaveProperty("user_id")
    expect(statement).toHaveProperty("description")
    expect(statement).toHaveProperty("amount")
    expect(statement).toHaveProperty("type")

    expect(statement.user_id).toBe(user.id)
    expect(statement.description).toBe("withdraw")
    expect(statement.amount).toBe(200)

  })

  it("Should not be able to make a withdraw with insufficient balance",async () =>{

    const user = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    const user_id = user.id || "";

    await expect(
        createStatementUseCase.execute({
        user_id,
        amount: 200,
        description: "withdraw",
        type: "withdraw" as OperationType,

      })
    ).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds)



  })


})


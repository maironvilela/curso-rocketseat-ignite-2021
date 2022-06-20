import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepository } from "../../../users/repositories/UsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import {GetBalanceError} from "./GetBalanceError"

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let statementsRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () =>{
  usersRepository = new InMemoryUsersRepository();
  statementsRepository = new InMemoryStatementsRepository();
  getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepository)
  beforeEach(() =>{

  })
  it("Should be able get balance", async () =>{
    const user = await usersRepository.create({
      email: "user@email.com",
      name: "user",
      password: await hash("123",8)
    })

    const user_id = user.id || "";

    await statementsRepository.create({
      user_id,
      amount:200,
      description:"salary",
      type: "deposit" as OperationType
    })
    await statementsRepository.create({
      user_id,
      amount:300,
      description:"freelance",
      type: "deposit" as OperationType
    })

    await statementsRepository.create({
      user_id,
      amount:100,
      description:"cine",
      type: "withdraw" as OperationType
    })

    const result = await getBalanceUseCase.execute({user_id})

    expect(result.balance).toEqual(400)
    expect(result.statement.length).toEqual(3)

  })

  it("Should not be able get balance with invalid user", async () =>{


  await expect(getBalanceUseCase.execute({user_id: "1236"})).rejects.toBeInstanceOf(GetBalanceError)

  })
})

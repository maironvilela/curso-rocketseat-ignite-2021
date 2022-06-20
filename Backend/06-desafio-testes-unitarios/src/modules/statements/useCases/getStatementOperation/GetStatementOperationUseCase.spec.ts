
import { hash } from "bcryptjs";
import { response } from "express";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import {IUsersRepository} from "../../../users/repositories/IUsersRepository";
import { OperationType, Statement } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { GetStatementOperationController } from "./GetStatementOperationController";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";



let usersRepository: IUsersRepository;
let statementsRepository: IStatementsRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get Statement Operation Use Case",  () =>{

  beforeEach(() =>{
    usersRepository = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepository, statementsRepository)
  })

  it("Should be able to get statement operation", async () =>{

    const user = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    const user_id = user.id || "";

    const statement = await statementsRepository.create({
      user_id,
      amount: 200,
      description: "deposit 01",
      type: "deposit" as OperationType,
    })

    const statement_id = statement.id || "";

    const result = await getStatementOperationUseCase.execute({
      user_id,
      statement_id
    })

    expect(result).toBeInstanceOf(Statement)
    expect(result).toHaveProperty("id")
    expect(result).toHaveProperty("user_id")
    expect(result.id).toEqual(statement_id)
    expect(result.user_id).toEqual(user_id)

  });

  it("Should not be able to get statement operation with invalid user", async () =>{


    const user_id = "invalid_user"

    const statement = await statementsRepository.create({
      user_id,
      amount: 200,
      description: "deposit 01",
      type: "deposit" as OperationType,
    })

    const statement_id = statement.id || "";


    await expect( getStatementOperationUseCase.execute({
      user_id,
      statement_id
    })).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound)

  });

});

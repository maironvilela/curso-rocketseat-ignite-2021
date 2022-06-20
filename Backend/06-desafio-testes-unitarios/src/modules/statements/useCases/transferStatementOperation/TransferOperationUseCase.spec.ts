import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType, Statement } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
 import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
 import { TransferOperationError } from "./TransferOperationError";
import { TransferOperationUseCase } from "./TransferOperationUseCase";



let usersRepository: IUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let statementsRepository: IStatementsRepository;
let sut: TransferOperationUseCase;



describe('Transfers', () =>{

  beforeEach(async () =>{
    usersRepository = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
     sut = new TransferOperationUseCase(usersRepository, statementsRepository);
  })



  it('Should be able call getUserBalance function with correct params', async () =>{
     // Criar um usuário
    const senderUser = await usersRepository.create({
      name: "senderUser",
      email: "senderUser@email.com",
      password: await hash("123",8)
    })
     const recipientUser = await usersRepository.create({
      name: "recipientUser",
      email: "recipientUser@email.com",
      password: await hash("123",8)
    })

    statementsRepository.create({
      user_id: senderUser.id??"",
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "saldo"
    })

    const dataTransfer = {
      senderId: senderUser.id??'',
      userId: recipientUser.id??'',
      amount: "100",
      description: "Description"
    }

    const getUserBalanceSpy = jest.spyOn(statementsRepository,'getUserBalance')
    await sut.execute(dataTransfer)
    expect(getUserBalanceSpy).toHaveBeenCalledWith({user_id: senderUser.id})

  });
  it('Should be able throws error 404 if balance is insufficient ',async () =>{

    const senderUser = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })
    const recipientUser = await usersRepository.create({
      name: "recipientUser",
      email: "recipientUser@email.com",
      password: await hash("123",8)
    })

    const dataTransfer = {
      senderId: senderUser.id??'',
      userId: recipientUser.id??'',
      amount: "100",
      description: "Description"
    }


    await expect(sut.execute(dataTransfer)).rejects.toBeInstanceOf(TransferOperationError.InsufficientFunds)

   })
   it('Should be able call create function with correct params', async () =>{
    const senderUser = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    await statementsRepository.create({
      user_id: senderUser.id??"",
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "saldo"
    })
    //Adicionar um deposito
    const recipientUser = await usersRepository.create({
      name: "Recipient User",
      email: "recipientUser@email.com",
      password: await hash("123",8)
    })

    const dataTransfer = {
      senderId: senderUser.id??'',
      userId: recipientUser.id??'',
      amount: "100",
      description: "Description"
    }

    const dataCreate = {
      sender_user_id: senderUser.id??'',
      user_id: recipientUser.id??'',
      amount: 100,
      description: "Description",
      type: OperationType.TRANSFER,
    }

    const getUserBalanceSpy = jest.spyOn(statementsRepository,'create')
    await sut.execute(dataTransfer)
    expect(getUserBalanceSpy).toHaveBeenCalledWith(dataCreate)
   })
   it('Should be able throws error if destiny account not exists', async () =>{
    const senderUser = await usersRepository.create({
      name: "admin",
      email: "admin@email.com",
      password: await hash("123",8)
    })

    const dataTransfer = {
      senderId: senderUser.id??'',
      userId: "any_destination_account",
      amount: "100",
      description: "Description"
    }


    await expect(sut.execute(dataTransfer)).rejects.toBeInstanceOf(TransferOperationError.NonExistentDestinationAccount)


   })

});

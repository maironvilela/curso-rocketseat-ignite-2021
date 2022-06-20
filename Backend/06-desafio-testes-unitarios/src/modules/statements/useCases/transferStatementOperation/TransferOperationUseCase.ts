import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType, Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
 import {TransferOperationError} from './TransferOperationError'

interface IRequest {
  senderId: string;
  userId: string;
  amount: string;
  description: string;
}

@injectable()
export class TransferOperationUseCase{
  constructor(
    @inject('UsersRepository')
  private usersRepository: IUsersRepository,
  @inject('StatementsRepository')
  private statementsRepository: IStatementsRepository,
  ){}

  async execute({senderId, amount, userId, description}: IRequest): Promise<Statement>{

    const isDestinationAccountExists = await this.usersRepository.findById(userId)

    if(!isDestinationAccountExists){
      throw new TransferOperationError.NonExistentDestinationAccount();
    }

    const {balance} = await this.statementsRepository.getUserBalance({user_id: senderId})

    if(balance < Number(amount)){
      throw new TransferOperationError.InsufficientFunds();
    }

    const transfer = await this.statementsRepository.create({
      user_id: userId,
      sender_user_id: senderId,
      type: OperationType.TRANSFER,
      amount: Number(amount),
      description,
    });

    return transfer;

  }
}

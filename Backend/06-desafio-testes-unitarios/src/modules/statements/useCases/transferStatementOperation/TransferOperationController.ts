import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { OperationType } from '../../entities/Statement';
import { TransferOperationUseCase } from './TransferOperationUseCase';


export class TransferOperationController {
  async execute(request: Request, response: Response) {
    const { id: userId } = request.user;
    const {amount, description} = request.body
    const  {sender_user_id: senderId} = request.params;



    const splittedPath = request.originalUrl.split('/')
    const type = splittedPath[splittedPath.length - 1] as OperationType;

    const transferOperationUseCase = container.resolve(TransferOperationUseCase);

    const statement = await transferOperationUseCase.execute({
      senderId,
      userId,
      amount,
      description,
     });


    return response.status(201).json({statement});
  }
}

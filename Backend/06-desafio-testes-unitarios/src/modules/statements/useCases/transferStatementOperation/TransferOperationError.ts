import { AppError } from "../../../../shared/errors/AppError";

export namespace TransferOperationError {
  export class InsufficientFunds
  extends AppError {
    constructor() {
      super('insufficient funds', 404);
    }
  }

  export class StatementNotFound extends AppError {
    constructor() {
      super('Statement not found', 404);
    }
  }

  export class NonExistentDestinationAccount extends AppError {
    constructor() {
      super('Statement not found', 404);
    }
  }
}

import { Statement } from "../entities/Statement";

export class BalanceMap {
  static toDTO({statement, balance}: { statement: Statement[], balance: number}) {
    const parsedStatement = statement.map(({
      id,
      sender_user_id,
      amount,
      description,
      type,
      created_at,
      updated_at
    }) => (
      {
        id,
        sender_user_id,
        amount: Number(amount),
        description,
        type,
        created_at,
        updated_at
      }
    ));

    return {
      statement: parsedStatement,
      balance: Number(balance)
    }
  }
}

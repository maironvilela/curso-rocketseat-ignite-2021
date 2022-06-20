declare namespace Express {
  import Statement from '../index'

  export interface Request {
    customer: {
      id: string
      name: string
      cpf:string
      statement: Statement[]
    };
  }
}

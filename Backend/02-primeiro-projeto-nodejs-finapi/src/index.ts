/* eslint-disable no-console */
import { format, isEqual } from 'date-fns';
import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidV4 } from 'uuid';

export interface Statement{
  id: string,
  type: "credit"| "debit",
  amount: number,
  description: string,
  created_at: Date
}

interface Customer{
  id: string;
  name: string;
  cpf:string;
  statement: Statement[]
}

let customers: Customer[] = [];
const app = express();
app.use(express.json());

function verifyExistsAccountWithCPF(request:Request, response:Response, next:NextFunction) {
  const { cpf } = request.headers;
  const customer = customers.find((customerFind) => customerFind.cpf === cpf);

  if (!customer) {
    return response.status(404).json({ error: 'customer not found' });
  }

  request.customer = customer;

  return next();
}

function getBalance (statement: Statement[]): number{

  const credit = statement.filter(statementFilter => statementFilter.type === 'credit')
                          .map(statementMap =>  statementMap.amount)
                          .reduce(((acc, amount) => acc + amount),0);

  const debit = statement.filter(statementFilter => statementFilter.type === 'debit')
                          .map(statementMap =>  statementMap.amount)
                          .reduce(((acc, amount) => acc - amount),0)

  return credit - debit;


}

function  getDateWithoutTime(date: Date): Date{

  const dateParse = format(date, 'dd,MM,yyyy')

  const year = dateParse.slice(6,10)
  const month = dateParse.slice(3,5)
  const day = dateParse.slice(0,2)

  return new Date(`${year}/${month}/${day}`)

}

function getDateFormatPtBRforEnUSWithoutTime(date: string): Date{

  const year = date.slice(6,10)
  const month = date.slice(3,5)
  const day = date.slice(0,2)

  const dateFormat = new Date(`${year}/${month}/${day}`)

  return dateFormat;

}

app.post('/accounts', (request, response) => {
  const { cpf, name } = request.body;

  const isCPFExists = customers.some((customer) => customer.cpf === cpf);

  if (isCPFExists) {
    response.status(400).json({ error: 'CPF informed already registered' });
    return;
  }

  const indice = customers.push({
    id: uuidV4(),
    name,
    cpf,
    statement: [],
  });

  response.status(201).json(customers[indice - 1]);
});

app.put('/accounts',verifyExistsAccountWithCPF, (request, response) => {
  const { name } = request.body;

  const customer = request.customer;
  customer.name = name;


  return response.status(200).json(customers)

});

app.get('/accounts',verifyExistsAccountWithCPF, (request, response) => {
  const customer = request.customer;

  console.log(customers)

  return response.status(200).json(customer)

});

app.get('/balance',verifyExistsAccountWithCPF, (request, response) => {
  const customer = request.customer;

  const balance = getBalance(customer.statement)

  return response.status(200).json({saldo: balance})

});

app.delete('/accounts/:id',verifyExistsAccountWithCPF, (request, response) => {
  const {id} = request.params;

  const index = customers.findIndex(custumer => custumer.id === id)

  customers.splice(index,1)

  return response.status(200).json({message: `customer ${customers[index].name} removed`});

});

app.get('/statement', verifyExistsAccountWithCPF, (request, response) => {
  const { customer } = request;
  response.status(200).json(customer.statement);
});

app.get('/statement/date',verifyExistsAccountWithCPF, (request, response) => {
  const {date} = request.query;
  const {customer} = request;


  const dateFormat = getDateFormatPtBRforEnUSWithoutTime(String(date))

  if(customer.statement.length ===0){
    response.status(200).json([]);
  }

  const statements = customer.statement.filter(statement =>
    isEqual(dateFormat, getDateWithoutTime(statement.created_at))
  )

  response.status(200).json(statements);
});

app.post('/deposit', verifyExistsAccountWithCPF, (request, response) => {

  console.log(request.body)

   const { description, amount,type } = request.body;

  const customer = request.customer;

  const index = customer.statement.push({
    id: uuidV4(),
    amount,
    description,
    type,
    created_at: new Date(),
  });

  return response.status(201).json(customer.statement[index-1])
});

app.post('/withdraw', verifyExistsAccountWithCPF, (request, response) =>{
  const { description='saque', amount, type } = request.body;

  const customer = request.customer

  const currentBalance = getBalance(customer.statement);

  if(currentBalance < amount){
    response.status(400).json({error: 'insufficient funds'});
  }

  const index = customer.statement.push({
    id: uuidV4(),
    amount,
    description,
    type,
    created_at: new Date(),
  });

  response.status(200).json({...customer.statement[index-1], 'saldo': currentBalance-amount})

});

app.listen(3333, () => {
  console.log('Sistema rodando na porta 3333');
});

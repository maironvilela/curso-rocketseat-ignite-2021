import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import {Connection} from "typeorm";
import request from "supertest";

import createConnection from "../../../../database";
import { app } from "../../../../app";

let connection: Connection;

describe("Get Statement Operation Controller",  () =>{

  beforeAll(async () =>{
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const name = "user";
    const email = "user@email.com";
    const password = await hash("123",8);

    const query = `INSERT INTO users(id, name, email, password, created_at, updated_at)
                   VALUES('${id}','${name}','${email}','${password}',now(), now())`


    await connection.query(query);


  })

  afterAll(async () =>{
    await connection.dropDatabase();
    await connection.close();

  })

  it("Should be able to get statement operation", async () =>{

    const responseAuth = await request(app).post("/api/v1/sessions").send({
      email: "user@email.com",
      password: "123"
    })

    const {token} = responseAuth.body;


    const statementResponse = await request(app).post("/api/v1/statements/deposit").send({
      amount: 100,
      description: "Salary"

    }).set({
      Authorization: `Bearer ${token}`
    })

    const {id} = statementResponse.body

    const response = await request(app).get(`/api/v1/statements/${id}`).set({
      Authorization: `Bearer ${token}`
    });

    const statement = response.body



    expect(response.status).toBe(200)
    expect(statement).toHaveProperty("id")
    expect(statement).toHaveProperty("user_id")
    expect(statement).toHaveProperty("description")
    expect(statement).toHaveProperty("amount")
    expect(statement).toHaveProperty("type")
    expect(statement).toHaveProperty("user_id")
    expect(statement.id).toEqual(id)
    expect(Number(statement.amount)).toEqual(100)
    expect(statement.type).toEqual("deposit")

  })


  it("Should not be able to get statement operation with", async () =>{

    const responseAuth = await request(app).post("/api/v1/sessions").send({
      email: "user@email.com",
      password: "123"
    })

    const {token} = responseAuth.body;


    const statementResponse = await request(app).post("/api/v1/statements/deposit").send({
      amount: 100,
      description: "Salary"

    }).set({
      Authorization: `Bearer ${token}`
    })

    const {id} = statementResponse.body

    const response = await request(app).get(`/api/v1/statements/${id}`).set({
      Authorization: `Bearer invalid_token`
    });

    const {message} = response.body

    expect(response.status).toBe(401)
    expect(message).toEqual("JWT invalid token!")


  })

})

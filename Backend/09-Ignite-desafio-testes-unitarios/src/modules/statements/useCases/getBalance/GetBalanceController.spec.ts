import { Connection } from "typeorm";
import {v4 as uuidV4} from "uuid";
import request from "supertest"
import {hash} from "bcryptjs";

import createConnection from "../../../../database"
import { app } from "../../../../app";
import { response } from "express";


let connection: Connection;
describe("Get Balance Controller", ()=>{

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

  it("Should be able get balance", async () =>{

    const responseAuth = await request(app).post("/api/v1/sessions").send({
      email: "user@email.com",
      password: "123"
    })

    const {token} = responseAuth.body

    await request(app).post("/api/v1/statements/deposit").send({
      amount: 100,
      description: "deposit 01"

    }).set({
      Authorization: `Bearer ${token}`
    })

    await request(app).post("/api/v1/statements/deposit").send({
      amount: 100,
      description: "deposit 02"

    }).set({
      Authorization: `Bearer ${token}`
    })

    await request(app).post("/api/v1/statements/withdraw").send({
      amount: 20,
      description: "withdraw 01"

    }).set({
      Authorization: `Bearer ${token}`
    })

    await request(app).post("/api/v1/statements/withdraw").send({
      amount: 30,
      description: "withdraw 01"

    }).set({
      Authorization: `Bearer ${token}`
    })


    const response = await request(app).get("/api/v1/statements/balance").set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(200);
    expect(response.body.statement.length).toBe(4)
    expect(response.body.balance).toEqual(150);

  })
  it("Should not be able get balance with invalid user", async () =>{

    const response = await request(app).get("/api/v1/statements/balance").set({
      Authorization: `Bearer 2356582555268764132`
    })

    const {message} = response.body

    expect(response.status).toBe(401);
    expect(message).toBe("JWT invalid token!")

  })

})

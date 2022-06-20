import { hash } from "bcryptjs";
import { Connection } from "typeorm";
import {v4 as uuidV4} from "uuid";
import request from "supertest"

import createConnection from "../../../../database/";
import { app } from "../../../../app";


let connection: Connection
const id = uuidV4();



describe ("Create Statement Controller", () =>{

  beforeAll(async () =>{
    connection = await createConnection();
    await connection.runMigrations();

    const name = "admin";
    const email = "admin@email.com";
    const password = await hash("123",8);

    const query = `INSERT INTO users(id, name, email, password, created_at, updated_at)
                    VALUES('${id}','${name}','${email}','${password}',now(), now())`

    await connection.query(query);

  })

  afterAll (async () =>{
    await connection.dropDatabase();
    await connection.close();

  })

  it("Should be able to make a deposit", async () =>{

    const responseAuth = await request(app).post("/api/v1/sessions").send({
      email: "admin@email.com",
      password: "123"
    })

    const {token} = responseAuth.body

    const response = await request(app).post("/api/v1/statements/deposit").send({
      amount: 100,
      description: "Salary"

    }).set({
      Authorization: `Bearer ${token}`
    })


    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("user_id")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("amount")
    expect(response.body).toHaveProperty("type")

    expect(response.body.user_id).toBe(id)
    expect(response.body.description).toBe("Salary")
    expect(response.body.amount).toBe(100)

  })

  it("Should not be able to make a deposit with invalid user",async () =>{

    const response = await request(app).post("/api/v1/statements/deposit").send({
      amount: 100,
      description: "Salary"

    }).set({
      Authorization: `Bearer ${uuidV4()}`
    })


    const {message} = response.body

    expect(response.status).toBe(401);
    expect(message).toEqual("JWT invalid token!")

  })


  it("Should be able to make a withdraw", async () =>{



    const responseAuth = await request(app).post("/api/v1/sessions").send({
      email: "admin@email.com",
      password: "123"
    })

    const {token} = responseAuth.body

    await request(app).post("/api/v1/statements/deposit").send({
      amount: 333,
      description: "Salary"

    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).post("/api/v1/statements/withdraw").send({
      amount: 50,
      description: "withdraw 01"

    }).set({
      Authorization: `Bearer ${token}`
    })


    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("user_id")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("amount")
    expect(response.body).toHaveProperty("type")

    expect(response.body.user_id).toBe(id)
    expect(response.body.description).toBe("withdraw 01")
    expect(response.body.amount).toBe(50)
    expect(response.body.type).toBe("withdraw")



  })

  it("Should not be able to make a withdraw with insufficient balance",async () =>{


    const responseAuth = await request(app).post("/api/v1/sessions").send({
      email: "admin@email.com",
      password: "123"
    })



    const {token} = responseAuth.body

    await request(app).post("/api/v1/statements/deposit").send({
      amount: 800,
      description: "Salary"

    }).set({
      Authorization: `Bearer ${token}`
    })


    const response = await request(app).post("/api/v1/statements/withdraw").send({
      amount: 1200.00,
      description: "withdraw"

    }).set({
      Authorization: `Bearer ${token}`
    })

    const {message} = response.body



    expect(response.status).toBe(400)
    expect(message).toEqual("Insufficient funds")
  })

})

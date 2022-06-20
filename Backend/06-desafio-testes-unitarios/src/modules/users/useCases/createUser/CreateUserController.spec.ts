import request from "supertest";
import {v4 as uuidV4} from "uuid"


import { Connection } from "typeorm"
import { hash } from "bcryptjs";



import  createConnection  from "../../../../database";
import { app } from "../../../../app";

let connection: Connection

describe("Create User Controller", () =>{

  beforeAll(async () =>{
    connection = await createConnection()
    await connection.runMigrations();
  })

  afterAll(async () =>{
    await connection.dropDatabase();
    await connection.close();
  })



  it("should be able to create user", async () =>{

    const response = await request(app).post("/api/v1/users").send({
      "name": "user 01",
      "email": "user@email.com.br",
      "password": "123"
    })

    expect(response.status).toBe(201)


  })

  it("should not be able to create user with existing email ", async () =>{
     await request(app).post("/api/v1/users").send({
      "name": "user 01",
      "email": "user@email.com.br",
      "password": "123"
    })

    const response = await request(app).post("/api/v1/users").send({
      "name": "user 01",
      "email": "user@email.com.br",
      "password": "123"
    })

    const {message} = response.body;


    expect(response.status).toBe(400)
    expect(message).toEqual("User already exists")


  })

})

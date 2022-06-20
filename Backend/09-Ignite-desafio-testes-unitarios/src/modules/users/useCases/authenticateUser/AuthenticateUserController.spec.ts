import { Connection } from "typeorm"
import {v4 as uuidV4} from "uuid";
import { hash } from "bcryptjs"
import request from "supertest"


import { app } from "../../../../app";
import createConnection from "../../../../database"



let connection: Connection

describe("Authenticate User", () =>{

  beforeAll(async () =>{

    connection = await createConnection();
    await connection.runMigrations();


    const id = uuidV4();
    const name="admin";
    const email = "admin@email.com";
    const password=await hash("admin",8);

    const query = `insert into users(id, name, email, password,created_at, updated_at)
    values ('${id}','${name}','${email}','${password}', now(), now())`

    await connection.query(query)

  })

  afterAll(async () =>{
    await connection.dropDatabase();
    await connection.close();

  })



  it("should be able to authenticate user",async () =>{

    const response = await request(app).post("/api/v1/sessions").send({
      email: "admin@email.com",
      password: "admin"
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
    expect(response.body).toHaveProperty("user")

  })


  it("should not be able to authenticate user with invalid e-mail",async () =>{

    const response = await request(app).post("/api/v1/sessions").send({
      email: "invalid_email",
      password: "admin"
    })

    expect(response.status).toBe(401)
    expect(response.body).toEqual({message: "Incorrect email or password"})


  })


  it("should not be able to authenticate user with invalid password",async () =>{

    const response = await request(app).post("/api/v1/sessions").send({
      email: "admin@email.com",
      password: "invalid_password"
    })

    expect(response.status).toBe(401)
    expect(response.body).toEqual({message: "Incorrect email or password"})


  })


})

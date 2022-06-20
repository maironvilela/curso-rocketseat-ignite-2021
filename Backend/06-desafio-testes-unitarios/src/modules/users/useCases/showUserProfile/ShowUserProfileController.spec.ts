import { Connection } from "typeorm"
import {v4 as uuidV4} from "uuid";
import { hash } from "bcryptjs"
import request from "supertest"


import { app } from "../../../../app";
import createConnection from "../../../../database"



let connection: Connection


describe("Show User profile Controller", () =>{

beforeAll(async () =>{

  connection = await createConnection();
    await connection.runMigrations();


    const id = uuidV4();
    const name="admin";
    const email = "admin.user.profile@email.com";
    const password=await hash("123",8);

    const query = `insert into users(id, name, email, password,created_at, updated_at)
    values ('${id}','${name}','${email}','${password}', now(), now())`

    await connection.query(query)

})

afterAll(async () =>{
  await connection.dropDatabase();
  await connection.close();
})

  it("should be able to load user profile",async () =>{

    const responseAuth = await request(app).post("/api/v1/sessions").send({
       email:"admin.user.profile@email.com",
       password: "123"

    })

    const {token} = responseAuth.body


     const response = await request(app).get("/api/v1/profile")
        .send()
        .set({
          Authorization: `Bearer ${token}`,
         });


    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("created_at")
    expect(response.body).toHaveProperty("updated_at")
    expect(response.body.name).toBe("admin")
    expect(response.body.email).toBe("admin.user.profile@email.com")

  })

  it("should not be able to load user profile without sending the token",async () =>{

    const responseAuth = await request(app).post("/api/v1/sessions").send({
       email:"admin.user.profile@email.com",
       password: "123"

    })

    const {token} = responseAuth.body;


    const response = await request(app).get("/api/v1/profile").send();
    const {message} = response.body


    expect(response.status).toBe(401)
    expect(message).toEqual("JWT token is missing!")






  })

  it("should not be able to load user profile with invalid token",async () =>{

    const invalid_token = uuidV4()

    const responseAuth = await request(app).post("/api/v1/sessions").send({
       email:"admin.user.profile@email.com",
       password: "123"

    })

    const {token} = responseAuth.body;


    const response = await request(app).get("/api/v1/profile")
    .send()
    .set({
      Authorization: `Bearer ${invalid_token}`,
     });    const {message} = response.body


    expect(response.status).toBe(401)
    expect(message).toEqual("JWT invalid token!")

  })
})

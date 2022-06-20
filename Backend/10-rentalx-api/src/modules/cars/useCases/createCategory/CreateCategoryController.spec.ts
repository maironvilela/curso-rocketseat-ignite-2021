import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;

beforeAll(async () => {
  connection = await createConnection();
  await connection.runMigrations();

  const id = process.env.SEEDS_ADMIN_ID;
  const password = process.env.SEEDS_ADMIN_PASSWORD;
  const email = process.env.SEEDS_ADMIN_EMAIL;

  const query = `INSERT INTO USERS(id, name, email, password, is_admin, driver_license,created_at, updated_at)
VALUES('${id}', 'admin', '${email}','${password}',true,'xxxxxxx', now(), now())`;

  await connection.query(query);
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
});

describe("Create Category Controller", () => {
  it("should be able to create a new category", async () => {
    const responseAuth = await request(app).post("/session").send({
      email: process.env.SEEDS_ADMIN_EMAIL,
      password: "admin",
    });

    const { token } = responseAuth.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "SUV22d",
        description: "Categoria de carro SUV 2",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    console.log(response.status);

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const responseAuth = await request(app).post("/session").send({
      email: process.env.SEEDS_ADMIN_EMAIL,
      password: "admin",
    });

    const { token } = responseAuth.body;

    await request(app)
      .post("/categories")
      .send({
        name: "category 01",
        description: "description category 01",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category 01",
        description: "description category 01",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    console.log(response.body);

    expect(response.status).toBe(400);
  });
});

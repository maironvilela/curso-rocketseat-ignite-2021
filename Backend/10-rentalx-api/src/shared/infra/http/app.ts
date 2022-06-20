import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "../../container";

import swaggerFile from "../../../swagger.json";
import AppError from "../../error/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ error: err.message });
  }

  return response
    .status(500)
    .json({ error: `Internal Server Error ${err.message}` });
});

export { app };

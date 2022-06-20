import { Router } from "express";

import CreateRentalsController from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import DevolutionRentalsController from "@modules/rentals/useCases/devolutionRentals/DevolutionRentalsController";
import ListRentalsByUserController from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalsController = new DevolutionRentalsController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.get(
  "/user",
  ensureAuthentication,
  listRentalsByUserController.handle
);
rentalRoutes.post("/", ensureAuthentication, createRentalsController.handle);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  devolutionRentalsController.handle
);

export { rentalRoutes };

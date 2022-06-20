import { Router } from "express";

import CreateSpecificationController from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import ListSpecificationController from "@modules/cars/useCases/listSpecifications/ListSpecificationController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthentication,
  createSpecificationController.handle
);

specificationsRoutes.get(
  "/",
  ensureAuthentication,
  listSpecificationController.handle
);

export { specificationsRoutes };

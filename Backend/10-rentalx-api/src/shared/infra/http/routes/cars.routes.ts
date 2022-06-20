import { Router } from "express";
import multer from "multer";

import multerConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import UploadCarsImageController from "@modules/cars/useCases/uploadCarsImage/UploadCarsImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();

const upload = multer(multerConfig.upload("cars"));

const createCarController = new CreateCarController();
const listCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarsImageController();

// documentado
carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

// documentado
carsRoutes.post(
  "/images/:id",
  ensureAuthentication,
  ensureAdmin,
  upload.array("images"),
  uploadCarsImageController.handle
);

carsRoutes.get("/available", ensureAuthentication, listCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthentication,
  createCarSpecificationController.handle
);

export { carsRoutes };

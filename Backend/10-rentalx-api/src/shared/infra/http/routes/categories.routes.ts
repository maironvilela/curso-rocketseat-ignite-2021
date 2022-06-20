import { Router } from "express";
import multer from "multer";

import multerConfig from "@config/upload";
import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import FileUploadCategoryController from "@modules/cars/useCases/fileUploadCategory/FileUploadCategoryController";
import ListCategoriesController from "@modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer(multerConfig.upload("files"));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const fileUploadCategoryController = new FileUploadCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  fileUploadCategoryController.handle
);

export { categoriesRoutes };

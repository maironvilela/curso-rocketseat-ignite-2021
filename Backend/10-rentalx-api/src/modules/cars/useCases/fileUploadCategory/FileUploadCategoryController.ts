import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import Category from "@modules/cars/infra/typeorm/entities/Category";

import FileUploadCategoryUseCase from "./FileUploadCategoryUseCase";

class FileUploadCategoryController {
  private categories: Category[] = [];

  async handle(
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response<Category[]>> {
    const { file } = request;

    const fileUploadCategoryUseCase = container.resolve(
      FileUploadCategoryUseCase
    );

    await fileUploadCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}
export default FileUploadCategoryController;

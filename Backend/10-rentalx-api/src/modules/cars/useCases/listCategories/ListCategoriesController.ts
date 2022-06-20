import { Request, Response } from "express";
import { container } from "tsyringe";

import Category from "@modules/cars/infra/typeorm/entities/Category";
import ListCategoriesUseCase from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category[]>> {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
    const categories = await listCategoryUseCase.execute();

    return response.status(200).json(categories);
  }
}

export default ListCategoriesController;

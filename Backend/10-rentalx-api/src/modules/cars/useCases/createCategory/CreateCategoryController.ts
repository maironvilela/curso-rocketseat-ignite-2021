import { Request, Response } from "express";
import { container } from "tsyringe";

import Category from "@modules/cars/infra/typeorm/entities/Category";

import CreateCategoriesUseCase from "./CreateCategoriesUseCase";

class CreateCategoryController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category>> {
    const { name, description } = request.body;
    const createCategoriesUseCase = container.resolve(CreateCategoriesUseCase);

    const category = await createCategoriesUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  }
}

export default CreateCategoryController;

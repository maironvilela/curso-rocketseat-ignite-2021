import { inject, injectable } from "tsyringe";

import Category from "@modules/cars/infra/typeorm/entities/Category";
import AppError from "@shared/error/AppError";

import ICategoriesRepository from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const isCategoryExists = await this.categoriesRepository.findByName(name);

    if (isCategoryExists) {
      throw new AppError("Informed category already exists", 400);
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export default CreateCategoriesUseCase;

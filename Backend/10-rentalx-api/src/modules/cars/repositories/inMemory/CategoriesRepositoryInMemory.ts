import { v4 as uuidV4 } from "uuid";

import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/infra/typeorm/entities/Category";

import ICategoriesRepository from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  constructor() {
    this.categories.push({
      id: "bcbac748-e6ed-4617-9fc4-14adcde2754f",
      name: "SUV2",
      description: "Categoria de carro SUV 2",
      created_at: new Date(),
      updated_at: new Date(),
    } as Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: uuidV4(),
      name,
      description,
      created_at: new Date(),
      update_at: new Date(),
    });

    const index = this.categories.push(category);

    return this.categories[index - 1];
  }
  async findById(id: string): Promise<Category> {
    return this.categories.find((category) => category.id === id);
  }
  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
  async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

export default CategoriesRepositoryInMemory;

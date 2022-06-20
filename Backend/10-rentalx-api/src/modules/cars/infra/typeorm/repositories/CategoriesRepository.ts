import { getRepository, Repository } from "typeorm";

import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";

import Category from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }
  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: {
        id,
      },
    });

    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    const categorySave = await this.repository.save(category);

    return categorySave;
  }

  findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({
      where: {
        name,
      },
    });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }
}

export default CategoriesRepository;

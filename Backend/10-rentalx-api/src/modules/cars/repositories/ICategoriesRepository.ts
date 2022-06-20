import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;

  findById(id: string): Promise<Category>;

  findByName(name: string): Promise<Category>;

  findAll(): Promise<Category[]>;
}

export default ICategoriesRepository;

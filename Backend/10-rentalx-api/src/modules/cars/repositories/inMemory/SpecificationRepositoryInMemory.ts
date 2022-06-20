import { v4 as uuidV4 } from "uuid";

import ICreateSpecificatioinDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import ISpecificationsRepository from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificatioinDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      id: uuidV4(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const index = this.specifications.push(specification);

    return this.specifications[index - 1];
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async findAll(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((spec) =>
      ids.includes(spec.id)
    );

    return specifications;
  }
}

export default SpecificationRepositoryInMemory;

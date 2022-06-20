import { getRepository, Repository } from "typeorm";

import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

interface ICreateSpecificaton {
  name: string;
  description: string;
}

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificaton): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    const specificationSave = await this.repository.save(specification);

    return specificationSave;
  }

  async findAll(): Promise<Specification[]> {
    const spefications = await this.repository.find();
    return spefications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export default SpecificationsRepository;

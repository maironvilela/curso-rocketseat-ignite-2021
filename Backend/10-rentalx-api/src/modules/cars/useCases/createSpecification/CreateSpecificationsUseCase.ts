import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import AppError from "@shared/error/AppError";
import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

export interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const isSpecificationExists = await this.specificationRepository.findByName(
      name
    );

    if (isSpecificationExists) {
      throw new AppError("Informed specification already exists");
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export default CreateSpecificationsUseCase;

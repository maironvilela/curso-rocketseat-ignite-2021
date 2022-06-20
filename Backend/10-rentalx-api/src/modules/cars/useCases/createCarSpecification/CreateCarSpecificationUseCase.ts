import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import AppError from "@shared/error/AppError";

interface IRequest {
  car_id: string;
  specifications?: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({ car_id, specifications }: IRequest): Promise<Car> {
    const car = await this.carRepository.findById(car_id);

    if (!car) {
      throw new AppError("Non-existent car informed ", 404);
    }

    const specs = await this.specificationsRepository.findByIds(specifications);

    car.specifications = specs;
    car.available = false;

    const carUpdated = await this.carRepository.create(car);

    return carUpdated;
  }
}

export default CreateCarSpecificationUseCase;

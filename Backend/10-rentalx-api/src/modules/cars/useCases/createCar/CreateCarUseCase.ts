import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import AppError from "@shared/error/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const isLicensePlateExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (isLicensePlateExists) {
      throw new AppError("License Plate already exists");
    }

    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError("category nonexistent");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      available: true,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export default CreateCarUseCase;

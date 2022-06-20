import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import SpecificationRepositoryInMemory from "@modules/cars/repositories/inMemory/SpecificationRepositoryInMemory";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import AppError from "@shared/error/AppError";

import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let specificationRepository: ISpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: ICarsRepository;

describe("Create specification for car", () => {
  beforeEach(() => {
    specificationRepository = new SpecificationRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificationRepository,
      carsRepository
    );
  });

  it("shold not be able add specifications for a unregistered car", async () => {
    await expect(
      createCarSpecificationUseCase.execute({ car_id: "non-existent id" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shold  be able add specifications for a car", async () => {
    const car = await carsRepository.create({
      name: "car 1",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "123",
      available: true,
    } as Car);

    const spec01 = await specificationRepository.create({
      name: "spec 01",
      description: "description spec 01",
    });

    const spec02 = await specificationRepository.create({
      name: "spec 01",
      description: "description spec 01",
    });

    const specifications = [spec01.id, spec02.id];

    const carUpdate = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications,
    });

    expect(carUpdate.specifications).toContain(spec01);
    expect(carUpdate.specifications).toContain(spec02);
  });
});

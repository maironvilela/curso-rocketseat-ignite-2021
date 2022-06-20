import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import CategoriesRepositoryInMemory from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";
import AppError from "@shared/error/AppError";

import CreateCarUseCase from "./CreateCarUseCase";

describe("Create Car", () => {
  let createCarUseCase: CreateCarUseCase;
  let carRepository: ICarsRepository;
  let categoryRepository: ICategoriesRepository;

  const category_id = "bcbac748-e6ed-4617-9fc4-14adcde2754f";

  beforeEach(() => {
    carRepository = new CarsRepositoryInMemory();
    categoryRepository = new CategoriesRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepository, categoryRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "nome",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id,
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate ", async () => {
    await createCarUseCase.execute({
      name: "car 1",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id,
    });

    await expect(
      createCarUseCase.execute({
        name: "car 2",
        brand: "marca",
        description: "descrição",
        license_plate: "AVBF364",
        fine_amount: 200,
        daily_rate: 100,
        category_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shold be able to create a new car with available true", async () => {
    const car = await createCarUseCase.execute({
      name: "car 1",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id,
    });

    expect(car.available).toBe(true);
  });

  it("shold not be able to create a new car with a nonexistent category ", async () => {
    await expect(
      createCarUseCase.execute({
        name: "car 1",
        brand: "marca",
        description: "descrição",
        license_plate: "AVBF364",
        fine_amount: 200,
        daily_rate: 100,
        category_id: "category nonexistent",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

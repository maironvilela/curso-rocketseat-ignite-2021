import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import DatefnsProvider from "@shared/container/providers/DateProviders/implementations/DatefnsProvider";
import IDateProviders from "@shared/container/providers/DateProviders/models/IDateProviders";
import AppError from "@shared/error/AppError";

import CreateRentalsUseCase from "./CreateRentalsUseCase";
// import AppError from "@shared/error/AppError";

let rentalsRepository: IRentalsRepository;
let carsRepository: ICarsRepository;
let dateProvider: IDateProviders;
let createRentalsUseCase: CreateRentalsUseCase;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DatefnsProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalsUseCase = new CreateRentalsUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      available: false,
      brand: "Fiat",
      category_id: "12345",
      daily_rate: 100,
      fine_amount: 150,
      license_plate: "ABC1234",
      name: "Touro",
      description:
        "Porta-objetos | Motor Turbo 270 Flex | Central Multimídia 10.1”",
    });

    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setMinutes(date.getMinutes() + 1);

    const rental = await createRentalsUseCase.execute({
      car_id: car.id,
      user_id: "user.id",
      expected_return_date: date,
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to return the carr in a minimum period of 24h", async () => {
    await expect(
      createRentalsUseCase.execute({
        car_id: "car_id",
        user_id: "user_id",
        expected_return_date: new Date(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able create a new rental if there is one open for the same car", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setMinutes(date.getMinutes() + 1);

    const car = await carsRepository.create({
      available: true,
      brand: "Fiat",
      category_id: "12345",
      daily_rate: 100,
      fine_amount: 150,
      license_plate: "ABC1234",
      name: "Touro",
      description:
        "Porta-objetos | Motor Turbo 270 Flex | Central Multimídia 10.1”",
    });

    await createRentalsUseCase.execute({
      car_id: car.id,
      user_id: "user_id",
      expected_return_date: date,
    });

    await expect(
      createRentalsUseCase.execute({
        car_id: car.id,
        user_id: "user_id_valid",
        expected_return_date: date,
      })
    ).rejects.toEqual(new AppError("mensagem"));
  });

  it("should not be able create a new rental if there is one open for the same user", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setMinutes(date.getMinutes() + 1);

    const car1 = await carsRepository.create({
      available: true,
      brand: "Fiat",
      category_id: "12345",
      daily_rate: 100,
      fine_amount: 150,
      license_plate: "ABC1234",
      name: "Touro",
      description:
        "Porta-objetos | Motor Turbo 270 Flex | Central Multimídia 10.1”",
    });

    const car2 = await carsRepository.create({
      available: true,
      brand: "Fiat",
      category_id: "12345",
      daily_rate: 100,
      fine_amount: 150,
      license_plate: "DEF4321",
      name: "Touro",
      description:
        "Porta-objetos | Motor Turbo 270 Flex | Central Multimídia 10.1”",
    });

    await createRentalsUseCase.execute({
      car_id: car1.id,
      user_id: "user_id",
      expected_return_date: date,
    });

    await expect(
      createRentalsUseCase.execute({
        car_id: car2.id,
        user_id: "user_id",
        expected_return_date: date,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

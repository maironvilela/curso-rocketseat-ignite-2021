import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import ListCarsUseCase from "./ListAvailableCarsUseCase";

describe("List Cars", () => {
  let carRepositotyInMemory: ICarsRepository;
  let listCarsUseCase: ListCarsUseCase;

  beforeEach(() => {
    carRepositotyInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carRepositotyInMemory);
  });

  it("shold be able the return available car list", async () => {
    await carRepositotyInMemory.create({
      name: "car 1",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "category nonexistent",
      available: true,
    });

    await carRepositotyInMemory.create({
      name: "car 2",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF365",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "category nonexistent",
      available: false,
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars.length).toEqual(1);
  });

  it("shold be able the return available car list with a specific name", async () => {
    const carReturn = await carRepositotyInMemory.create({
      name: "car 1",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "1",
      available: true,
    });

    await carRepositotyInMemory.create({
      name: "car 2",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF365",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "2",
      available: false,
    });

    await carRepositotyInMemory.create({
      name: "car 3",
      brand: "marca",
      description: "descrição",
      license_plate: "AVBF366",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "3",
      available: true,
    });

    const cars = await listCarsUseCase.execute({ name: "car 1" });

    expect(cars.length).toEqual(1);
    expect(cars).toContain(carReturn);
  });

  it("shold be able the return available car list with a specific name and brand", async () => {
    const carReturn = await carRepositotyInMemory.create({
      name: "car 1",
      brand: "marca 1",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "1",
      available: true,
    });

    await carRepositotyInMemory.create({
      name: "car 2",
      brand: "marca 2",
      description: "descrição",
      license_plate: "AVBF365",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "2",
      available: false,
    });

    await carRepositotyInMemory.create({
      name: "car 3",
      brand: "marca 2",
      description: "descrição",
      license_plate: "AVBF366",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "3",
      available: true,
    });

    const cars = await listCarsUseCase.execute({
      name: "car 1",
      brand: "marca 1",
    });

    expect(cars.length).toEqual(1);
    expect(cars).toContain(carReturn);
  });

  it("shold be able the return available car list with a specific name,brand and category", async () => {
    const carReturn = await carRepositotyInMemory.create({
      name: "car 1",
      brand: "marca 1",
      description: "descrição",
      license_plate: "AVBF364",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "1",
      available: true,
    });

    await carRepositotyInMemory.create({
      name: "car 1",
      brand: "marca 1",
      description: "descrição",
      license_plate: "AVBF365",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "1",
      available: false,
    });

    await carRepositotyInMemory.create({
      name: "car 1",
      brand: "marca 2",
      description: "descrição",
      license_plate: "AVBF366",
      fine_amount: 200,
      daily_rate: 100,
      category_id: "3",
      available: true,
    });

    const cars = await listCarsUseCase.execute({
      name: "car 1",
      brand: "marca 1",
      category_id: "1",
    });

    expect(cars.length).toEqual(1);
    expect(cars).toContain(carReturn);
  });
});

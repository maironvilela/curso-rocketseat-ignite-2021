import { v4 as uuidV4 } from "uuid";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import IFindAvailableDTO from "@modules/cars/dtos/IFindAvailableDTO";
import IUpdateAvailableCarDTO from "@modules/cars/dtos/IUpdateAvailableCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarsRepository from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    id,
    name,
    description,
    daily_rate,
    available,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    let car: Car;
    let add = true;

    if (id) {
      car = this.cars.find((car) => car.id === id);
      add = false;
    } else {
      car = new Car();
    }

    Object.assign(car, {
      id: id || uuidV4(),
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_id,
      created_at: id ? car.created_at : new Date(),
      updated_at: new Date(),
      specifications,
    });

    if (add) {
      const index = this.cars.push(car);
      return this.cars[index - 1];
    }

    return car;
  }

  async findAvailable({
    name,
    brand,
    category_id,
  }: IFindAvailableDTO): Promise<Car[]> {
    const cars = this.cars
      .filter((car) => car.available)
      .filter((car) => (name ? car.name === name : car))
      .filter((car) => (brand ? car.brand === brand : car))
      .filter((car) => (category_id ? car.category_id === category_id : car));
    return cars;
  }

  async findByLicensePlate(licensePate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === licensePate);

    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable({
    car_id,
    available,
  }: IUpdateAvailableCarDTO): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === car_id);
    this.cars[index].available = available;
  }
}

export default CarsRepositoryInMemory;

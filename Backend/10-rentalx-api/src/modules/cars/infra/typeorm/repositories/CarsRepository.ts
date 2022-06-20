import { getRepository, Repository } from "typeorm";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import IFindAvailableDTO from "@modules/cars/dtos/IFindAvailableDTO";
import IUpdateAvailableCarDTO from "@modules/cars/dtos/IUpdateAvailableCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
  private carRepository: Repository<Car>;
  private categories: string[] = ["1", "2", "3", "4"];

  constructor() {
    this.carRepository = getRepository(Car);
  }

  async findAvailable({
    name,
    category_id,
    brand,
  }: IFindAvailableDTO): Promise<Car[]> {
    const query = await this.carRepository
      .createQueryBuilder("cars")
      .where("cars.available = :available", { available: true });

    if (name) {
      query.andWhere("cars.name = :name", { name });
    }
    if (brand) {
      query.andWhere("cars.brand = :brand", { brand });
    }

    if (category_id) {
      query.andWhere("cars.category_id = :category_id", { category_id });
    }

    const cars = await query.getMany();

    return cars;
  }
  async create({
    id,
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
    brand,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.carRepository.create({
      id,
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
      specifications,
    });

    const carSave = await this.carRepository.save(car);

    return carSave;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        license_plate: licensePlate,
      },
    });

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne(id);
    return car;
  }

  async updateAvailable({
    car_id,
    available,
  }: IUpdateAvailableCarDTO): Promise<void> {
    await this.carRepository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id: car_id })
      .execute();
  }
}

export default CarsRepository;

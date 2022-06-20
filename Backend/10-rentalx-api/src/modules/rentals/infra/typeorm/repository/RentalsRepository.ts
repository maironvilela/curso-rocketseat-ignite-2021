import { getRepository, Repository } from "typeorm";

import ICreateRentalsDTO from "@modules/rentals/dtos/ICreateRentalsDTO";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

import Rentals from "../entities/Rentals";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rentals>;

  constructor() {
    this.repository = getRepository(Rentals);
  }

  async create({
    id,
    car_id,
    user_id,
    start_date,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalsDTO): Promise<Rentals> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      start_date,
      expected_return_date,
      end_date,
      total,
    });

    console.log(rental);

    const rentalSave = await this.repository.save(rental);

    return rentalSave;
  }

  async findOpenRentalsByCar(id: string): Promise<Rentals> {
    const rental = await this.repository.findOne({
      where: {
        end_date: undefined,
        car_id: id,
      },
    });

    return rental;
  }
  async findOpenRentalsByUser(id: string): Promise<Rentals> {
    const rental = await this.repository.findOne({
      where: {
        end_date: undefined,
        user_id: id,
      },
    });

    return rental;
  }

  async findById(id: string): Promise<Rentals> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findRentalsByUser(id: string): Promise<Rentals[]> {
    const rentals = await this.repository.find({
      where: {
        user_id: id,
      },
      relations: ["car"],
    });

    return rentals;
  }
}

export default RentalsRepository;

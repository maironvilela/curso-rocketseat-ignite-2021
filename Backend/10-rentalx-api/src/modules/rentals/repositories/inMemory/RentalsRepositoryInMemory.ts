import { v4 as uuidV4 } from "uuid";

import ICreateRentalsDTO from "@modules/rentals/dtos/ICreateRentalsDTO";
import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";

import IRentalsRepository from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rentals[] = [];

  async create({
    user_id,
    car_id,
    start_date,
    expected_return_date,
  }: ICreateRentalsDTO): Promise<Rentals> {
    const rental = new Rentals();

    Object.assign(rental, {
      id: uuidV4(),
      user_id,
      car_id,
      start_date,
      expected_return_date,
      created_ad: new Date(),
      updated_at: new Date(),
    });

    /*
   end_date: Date;
  expected_return_date: Date;
  total: number;
  created_at: Date;
  updated_at: Date; */

    const index = this.rentals.push(rental);

    return this.rentals[index - 1];
  }

  async findOpenRentalsByCar(id: string): Promise<Rentals> {
    const rental = this.rentals
      .filter((rental) => !rental.end_date)
      .find((rental) => rental.car_id === id);

    return rental;
  }
  async findOpenRentalsByUser(id: string): Promise<Rentals> {
    const rental = this.rentals
      .filter((rental) => !rental.end_date)
      .find((rental) => rental.user_id === id);

    return rental;
  }

  async findById(id: string): Promise<Rentals> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental;
  }

  async findRentalsByUser(id: string): Promise<Rentals[]> {
    const rentalResult = this.rentals.filter((rental) => rental.user_id === id);
    return rentalResult;
  }
}

export default RentalsRepositoryInMemory;

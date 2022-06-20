// import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";

import { inject, injectable } from "tsyringe";

import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
  id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Rentals[]> {
    const rentals = await this.rentalsRepository.findRentalsByUser(id);

    return rentals;
  }
}

export default ListRentalsByUserUseCase;

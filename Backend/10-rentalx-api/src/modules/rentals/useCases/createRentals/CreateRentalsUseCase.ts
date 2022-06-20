import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProviders from "@shared/container/providers/DateProviders/models/IDateProviders";
import AppError from "@shared/error/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProviders
  ) {}
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rentals> {
    const dateCompare = new Date(new Date());
    dateCompare.setDate(dateCompare.getDate() + 1);

    const result = this.dateProvider.compareDifference24h(
      expected_return_date,
      dateCompare
    );

    if (result) {
      throw new AppError("invalid return date");
    }

    /* Verificar se o carro esta disponível */
    const isCarRented = await this.rentalsRepository.findOpenRentalsByCar(
      car_id
    );

    if (isCarRented) {
      throw new AppError("unavailable car");
    }

    /* Verificar se o cliente possui aluguel em aberto */
    const isUserWithActiveRent =
      await this.rentalsRepository.findOpenRentalsByUser(user_id);

    if (isUserWithActiveRent) {
      throw new AppError("user with active rent");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.carsRepository.updateAvailable({ car_id, available: false });

    return rental;
  }
}

export default CreateRentalsUseCase;

import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProviders from "@shared/container/providers/DateProviders/models/IDateProviders";
import AppError from "@shared/error/AppError";

interface IRequest {
  rental_id: string;
}

@injectable()
class DevolutionRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProviders
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rentals> {
    const rental = await this.rentalsRepository.findById(rental_id);
    const car = await this.carsRepository.findById(rental?.car_id);

    let fine_amount = 0;

    console.log(rental);

    if (!rental) {
      throw new AppError("Rental not found");
    }

    /* Verifica diarias excendente */
    const diffInHours = this.dateProvider.getDifferenceInHoursOfTwoDates(
      rental.expected_return_date,
      new Date()
    );

    if (diffInHours > 24) {
      const dailyExceeded = Math.ceil(diffInHours / 24);
      fine_amount = car.fine_amount * dailyExceeded;
    }

    const rentedHours = this.dateProvider.getDifferenceInHoursOfTwoDates(
      rental.start_date,
      rental.expected_return_date
    );

    const daily = Math.ceil(rentedHours / 24);

    console.log(daily);

    rental.total = car.daily_rate * daily + fine_amount;
    rental.end_date = new Date();

    const updatedRental = await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable({
      car_id: car.id,
      available: true,
    });

    return updatedRental;
  }
}

export default DevolutionRentalsUseCase;

import { Request, Response } from "express";
import { container } from "tsyringe";

import DevolutionRentalsUseCase from "./DevolutionRentalsUseCase";

class DevolutionRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: rental_id } = request.params;

    const devolutionRentalsUseCase = container.resolve(
      DevolutionRentalsUseCase
    );

    const rental = await devolutionRentalsUseCase.execute({ rental_id });

    return response.status(200).json(rental);
  }
}

export default DevolutionRentalsController;

import { Request, Response } from "express";
import { container } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";

import CreateCarUseCase from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response<Car>> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
    });

    return response.status(201).json(car);
  }
}

export default CreateCarController;

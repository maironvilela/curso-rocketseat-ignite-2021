import { Request, Response } from "express";
import { container } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response<Car[]>> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    if (!cars) {
      return response.status(204).json([]);
    }

    return response.status(200).json(cars);
  }
}

export default ListAvailableCarsController;

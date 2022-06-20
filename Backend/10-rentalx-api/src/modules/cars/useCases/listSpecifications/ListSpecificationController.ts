import { Request, Response } from "express";
import { container } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import ListSpecificationUseCase from "./ListSpecificationUseCase";

class ListSpecificationController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Specification[]>> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase
    );
    const specifications = await listSpecificationUseCase.execute();

    return response.status(200).json(specifications);
  }
}

export default ListSpecificationController;

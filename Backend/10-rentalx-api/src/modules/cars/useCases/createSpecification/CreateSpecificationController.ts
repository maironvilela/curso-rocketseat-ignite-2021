import { Request, Response } from "express";
import { container } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import CreateSpecificationsUseCase from "./CreateSpecificationsUseCase";

class CreateSpecificationController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Specification>> {
    const { description, name } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationsUseCase
    );

    const specification = await createSpecificationUseCase.execute({
      description,
      name,
    });

    return response.status(201).json(specification);
  }
}

export default CreateSpecificationController;

import { Request, Response } from "express";
import { container } from "tsyringe";

import UploadCarsImageUseCase from "./UploadCarsImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarsImageController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const images_name = images.map((image) => image.filename);

    const uploadCarsImageUseCase = container.resolve(UploadCarsImageUseCase);

    await uploadCarsImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.send();
  }
}

export default UploadCarsImageController;

import { inject, injectable } from "tsyringe";

import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarsImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    /*
    const car = await this.carsRepository.findById(car_id);

    procedimento para captar imagens que foram removidas
    const imageRemove = car.images.filter(
      (img) => !images_name.includes(img.id)
    ); */

    images_name.map(async (image) => {
      await this.carsImageRepository.create({ car_id, image_name: image });
    });
  }
}

export default UploadCarsImageUseCase;

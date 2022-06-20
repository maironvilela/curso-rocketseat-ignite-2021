import { getRepository, Repository } from "typeorm";

import ICreateCarsImageDTO from "@modules/cars/dtos/ICreateCarsImageDTO";
import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";

import CarsImage from "../entities/CarsImage";

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarsImage>;
  constructor() {
    this.repository = getRepository(CarsImage);
  }

  async create({
    car_id,
    image_name,
  }: ICreateCarsImageDTO): Promise<CarsImage> {
    const carImage = this.repository.create({ car_id, image_name });

    const carImageSave = await this.repository.save(carImage);

    return carImageSave;
  }

  async findAllById(ids: string[]): Promise<CarsImage[]> {
    const carsImages = await this.repository.findByIds(ids);
    return carsImages;
  }
}

export default CarsImageRepository;

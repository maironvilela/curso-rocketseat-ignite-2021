import ICreateCarsImageDTO from "@modules/cars/dtos/ICreateCarsImageDTO";
import CarsImage from "@modules/cars/infra/typeorm/entities/CarsImage";

import ICarsImageRepository from "../ICarsImageRepository";

class CarsImageRepositoryInMemory implements ICarsImageRepository {
  create(data: ICreateCarsImageDTO): Promise<CarsImage> {
    throw new Error("Method not implemented.");
  }
}

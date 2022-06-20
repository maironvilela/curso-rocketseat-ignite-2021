import ICreateCarsImageDTO from "../dtos/ICreateCarsImageDTO";
import CarsImage from "../infra/typeorm/entities/CarsImage";

interface ICarsImageRepository {
  create(data: ICreateCarsImageDTO): Promise<CarsImage>;

  findAllById(ids: string[]): Promise<CarsImage[]>;
}

export default ICarsImageRepository;

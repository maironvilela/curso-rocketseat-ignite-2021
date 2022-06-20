import ICreateCarDTO from "../dtos/ICreateCarDTO";
import IFindAvailableDTO from "../dtos/IFindAvailableDTO";
import IUpdateAvailableCarDTO from "../dtos/IUpdateAvailableCarDTO";
import Car from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(data: IUpdateAvailableCarDTO): Promise<void>;
}

export default ICarsRepository;

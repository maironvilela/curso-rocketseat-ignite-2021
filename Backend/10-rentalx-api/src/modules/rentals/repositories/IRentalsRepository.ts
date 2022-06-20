import ICreateRentalsDTO from "../dtos/ICreateRentalsDTO";
import Rentals from "../infra/typeorm/entities/Rentals";

interface IRentalsRepository {
  create(data: ICreateRentalsDTO): Promise<Rentals>;
  findOpenRentalsByCar(id: string): Promise<Rentals>;
  findOpenRentalsByUser(id: string): Promise<Rentals>;
  findById(id: string): Promise<Rentals>;
  findRentalsByUser(id: string): Promise<Rentals[]>;
}

export default IRentalsRepository;

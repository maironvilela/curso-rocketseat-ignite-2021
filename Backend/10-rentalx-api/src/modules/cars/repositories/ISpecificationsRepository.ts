import ICreateSpecificatioinDTO from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificatioinDTO): Promise<Specification>;

  findByName(name: string): Promise<Specification>;

  findAll(): Promise<Specification[]>;

  findByIds(ids: string[]): Promise<Specification[]>;
}

export default ISpecificationsRepository;

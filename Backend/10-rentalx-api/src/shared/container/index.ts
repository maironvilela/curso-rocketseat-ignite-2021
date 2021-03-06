import { container } from "tsyringe";

import "./providers";

import UsersRepository from "@modules/acount/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "@modules/acount/infra/typeorm/repositories/UsersTokensRepository";
import IUSersRepository from "@modules/acount/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/acount/repositories/IUsersTokensRepository";
import CarsImageRepository from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import RentalsRepository from "@modules/rentals/infra/typeorm/repository/RentalsRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUSersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
);
container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

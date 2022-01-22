import { container } from 'tsyringe';

import { IUsersRepository } from '../../domain/accounts/infra/contracts/IUsersRepository';
import { UsersRepository } from '../../domain/accounts/infra/typeorm/repositories/UsersRepository';
import { ICarsRepository } from '../../domain/cars/infra/contracts/ICarsRepository';
import { ICategoriesRepository } from '../../domain/cars/infra/contracts/ICategoriesRepository';
import { ISpecificationsRepository } from '../../domain/cars/infra/contracts/ISpecificationsRepository';
import { CarsRepository } from '../../domain/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../domain/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '../../domain/cars/infra/typeorm/repositories/SpeficicationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

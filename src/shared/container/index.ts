import { container } from 'tsyringe';

import { IUsersRepository } from '../../domain/accounts/infra/contracts/IUsersRepository';
import { UserRepository } from '../../domain/accounts/infra/repositories/UserRepository';
import { ICategoriesRepository } from '../../domain/cars/infra/contracts/ICategoriesRepository';
import { ISpecificationsRepository } from '../../domain/cars/infra/contracts/ISpecificationsRepository';
import { CategoriesRepository } from '../../domain/cars/infra/repositories/CategoriesRepository';
import { SpecificationRepository } from '../../domain/cars/infra/repositories/SpeficicationRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

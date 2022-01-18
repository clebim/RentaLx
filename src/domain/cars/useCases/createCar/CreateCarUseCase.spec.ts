import faker from 'faker';

import { CarsRepository } from '../../infra/typeorm/repositories/CarsRepository';
import { ICreateCarDTO } from '../../interfaces/cars/ICreateCar';
import { CreateCarUseCase } from './CreateCarUseCase';

jest.mock('../../infra/typeorm/repositories/CarsRepository');
const repositoryMock = CarsRepository as jest.MockedClass<
  typeof CarsRepository
>;

const carsRepository = new CarsRepository();
let createCarUseCase: CreateCarUseCase;
let createCarProps: ICreateCarDTO;

describe('Create Car useCase', () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase(carsRepository);
    createCarProps = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      dailyRate: faker.datatype.number(100),
      brand: faker.datatype.string(),
      fineAmount: faker.datatype.number(60),
      licensePlate: faker.datatype.string(),
      categoryId: faker.datatype.uuid(),
    };
  });

  it('should able create a new car', async () => {
    createCarUseCase.execute(createCarProps);
  });
});

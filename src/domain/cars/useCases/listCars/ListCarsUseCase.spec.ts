import faker from 'faker';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../helpers/domainResults/CreateRepositoryResults';
import { IRepositoryError } from '../../../../helpers/domainResults/interfaces';
import { Car } from '../../infra/typeorm/entities/Car';
import { CarsRepository } from '../../infra/typeorm/repositories/CarsRepository';
import { IListCarsDTO } from '../../interfaces/cars/IListCars';
import { ListCarsUseCase } from './ListCarsUseCase';

jest.mock('../../infra/typeorm/repositories/CarsRepository');
const repositoryMock = CarsRepository as jest.MockedClass<
  typeof CarsRepository
>;

let listCarsUseCase: ListCarsUseCase;
let carsList: Car[];
const carsRepository = new CarsRepository();

const generateListCars = (): Car[] => {
  const auxArray = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const newCar: Car = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      available: faker.datatype.boolean(),
      categoryId: faker.datatype.uuid(),
      brand: faker.datatype.string(),
      dailyRate: faker.datatype.number(),
      fineAmount: faker.datatype.number(),
      licensePlate: faker.datatype.string(),
      category: {
        id: faker.datatype.uuid(),
        name: faker.datatype.string(),
        description: faker.datatype.string(),
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
      },
      specifications: [],
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    auxArray.push(newCar);
  }

  return auxArray;
};

describe('List Cars useCase', () => {
  beforeEach(() => {
    listCarsUseCase = new ListCarsUseCase(carsRepository);
    carsList = generateListCars();
  });

  it('should able to list all cars', async () => {
    repositoryMock.prototype.list.mockResolvedValue(
      createRepositorySuccess([carsList, carsList.length]),
    );

    const callRepositoryProps = {
      totalItemsPerPage: 30,
      page: 1,
      order: 'ASC',
      orderBy: 'name',
    };

    const { data, isSuccess } = await listCarsUseCase.execute({});

    expect(isSuccess).toBeTruthy();
    expect(data.cars).toHaveLength(carsList.length);
    expect(repositoryMock.prototype.list).toBeCalledWith(callRepositoryProps);
  });

  it('should able to list cars with filters and pagination', async () => {
    repositoryMock.prototype.list.mockResolvedValue(
      createRepositorySuccess([carsList, carsList.length]),
    );

    const listCarsDtoMock: IListCarsDTO = {
      page: 2,
      totalItemsPerPage: 5,
      available: true,
      order: 'ASC',
      orderBy: 'brand',
    };

    const { data, isSuccess } = await listCarsUseCase.execute(listCarsDtoMock);

    expect(isSuccess).toBeTruthy();
    expect(data.cars).toHaveLength(carsList.length);
    expect(repositoryMock.prototype.list).toBeCalledWith(listCarsDtoMock);
    expect(data.page).toEqual(listCarsDtoMock.page);
  });

  it('should not able list category because unknown error', async () => {
    const repositoryDataError: IRepositoryError = {
      message: 'Error list cars in database',
      repository: 'CarsRepository',
    };

    const repositoryError = createRepositoryError(repositoryDataError);

    repositoryMock.prototype.list.mockResolvedValue(repositoryError);

    const response = await listCarsUseCase.execute({});

    expect(response.data).toBe(null);
    expect(response.isFailure).toBe(true);
    expect(response.error.message).toEqual(repositoryDataError.message);
    expect(response.error.statusCode).toEqual(400);
  });

  it('should not able to list category because repository fatal error', async () => {
    repositoryMock.prototype.list.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await listCarsUseCase.execute({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });
});

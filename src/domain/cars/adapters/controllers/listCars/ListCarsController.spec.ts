import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../../helpers/domainResults/CreateUseCaseResults';
import { IUseCaseError } from '../../../../../helpers/domainResults/interfaces';
import { Car } from '../../../infra/typeorm/entities/Car';
import { IListCarsDTO } from '../../../interfaces/cars/IListCars';
import { IListCarsData } from '../../../interfaces/cars/IListCarsData';
import { ListCarsUseCase } from '../../../useCases/listCars/ListCarsUseCase';
import { listCarsController } from './ListCarsController';

jest.mock('../../../useCases/listCars/ListCarsUseCase');

const listCarsMock = ListCarsUseCase as jest.MockedClass<
  typeof ListCarsUseCase
>;

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

let carsList: Car[];

const queryParams: IListCarsDTO = {
  name: faker.datatype.string(12),
  order: 'ASC',
  totalItemsPerPage: faker.datatype.number(30),
  page: faker.datatype.number(10),
};

describe('List Cars Controller', () => {
  beforeEach(() => {
    listCarsMock.prototype.execute.mockRestore();
    carsList = generateListCars();
  });

  it('should response statusCode 200 when call listCars', async () => {
    const responseService: IListCarsData = {
      cars: carsList,
      totalItems: faker.datatype.number(),
      page: faker.datatype.number(),
      totalItemsPerPage: faker.datatype.number(),
      totalPages: faker.datatype.number(),
    };

    const mockRequest = getMockReq({
      query: queryParams,
    });

    const { res, next } = getMockRes();

    const serviceSucess = createUseCaseSuccess<IListCarsData>(responseService);

    listCarsMock.prototype.execute.mockResolvedValue(serviceSucess);

    await listCarsController(mockRequest, res, next);

    expect(listCarsMock.prototype.execute).toBeCalledTimes(1);
    expect(listCarsMock.prototype.execute).toBeCalledWith(queryParams);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call listCars', async () => {
    const mockRequest = getMockReq({
      query: queryParams,
    });

    const { res, next } = getMockRes();

    const createCategoryError: IUseCaseError = {
      message: 'Error list cars in database',
      statusCode: 400,
    };

    const serviceError = createUseCaseError(createCategoryError);

    listCarsMock.prototype.execute.mockResolvedValue(serviceError);

    await listCarsController(mockRequest, res, next);

    expect(listCarsMock.prototype.execute).toBeCalledTimes(1);
    expect(listCarsMock.prototype.execute).toBeCalledWith(queryParams);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: createCategoryError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const mockRequest = getMockReq({
      query: queryParams,
    });

    const { res, next } = getMockRes();

    listCarsMock.prototype.execute.mockRejectedValue(new Error('fatal error'));

    await listCarsController(mockRequest, res, next);

    expect(listCarsMock.prototype.execute).toBeCalledTimes(1);
    expect(listCarsMock.prototype.execute).toBeCalledWith(queryParams);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});

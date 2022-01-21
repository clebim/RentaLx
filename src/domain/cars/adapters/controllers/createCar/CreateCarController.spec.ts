import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../../helpers/domainResults/CreateUseCaseResults';
import { IUseCaseError } from '../../../../../helpers/domainResults/interfaces';
import { Car } from '../../../infra/typeorm/entities/Car';
import { ICreateCarDTO } from '../../../interfaces/cars/ICreateCar';
import { ICreateCategoryDTO } from '../../../interfaces/categories/ICreateCategory';
import { CreateCarUseCase } from '../../../useCases/createCar/CreateCarUseCase';
import { createCarController } from './CreateCarController';

jest.mock('../../../useCases/createCar/CreateCarUseCase');

const createCarUseCase = CreateCarUseCase as jest.MockedClass<
  typeof CreateCarUseCase
>;

let createCarProps: ICreateCarDTO;

describe('Create Car Controller', () => {
  beforeEach(() => {
    createCarUseCase.prototype.execute.mockRestore();
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

  it('should response statusCode 201 when call createCar', async () => {
    const mockRequest = getMockReq({
      body: createCarProps,
    });

    const { res, next } = getMockRes();

    const carMock = {
      id: faker.datatype.uuid(),
      available: true,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      ...createCarProps,
    } as Car;

    const serviceSucess = createUseCaseSuccess<Car>(carMock);

    createCarUseCase.prototype.execute.mockResolvedValue(serviceSucess);

    await createCarController(mockRequest, res, next);

    expect(createCarUseCase.prototype.execute).toBeCalledTimes(1);
    expect(createCarUseCase.prototype.execute).toBeCalledWith(createCarProps);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(carMock);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call createCar', async () => {
    const mockRequest = getMockReq({
      body: createCarProps,
    });

    const { res, next } = getMockRes();

    const createCategoryError: IUseCaseError = {
      message: 'License plate already registered in platform',
      statusCode: 400,
    };

    const serviceError = createUseCaseError(createCategoryError);

    createCarUseCase.prototype.execute.mockResolvedValue(serviceError);

    await createCarController(mockRequest, res, next);

    expect(createCarUseCase.prototype.execute).toBeCalledTimes(1);
    expect(createCarUseCase.prototype.execute).toBeCalledWith(createCarProps);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: createCategoryError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const mockRequest = getMockReq({
      body: createCarProps,
    });

    const { res, next } = getMockRes();

    createCarUseCase.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await createCarController(mockRequest, res, next);

    expect(createCarUseCase.prototype.execute).toBeCalledTimes(1);
    expect(createCarUseCase.prototype.execute).toBeCalledWith(createCarProps);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});

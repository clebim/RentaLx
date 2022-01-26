import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../../helpers/domainResults/CreateUseCaseResults';
import { IUseCaseError } from '../../../../../helpers/domainResults/interfaces';
import { Car } from '../../../infra/typeorm/entities/Car';
import { CreateCarSpecificationUseCase } from '../../../useCases/createCarSepecification/CreateCarSpecificationUseCase';
import { CreateCarSpecificationController } from './CreateCarSpecificationController';

jest.mock(
  '../../../useCases/createCarSepecification/CreateCarSpecificationUseCase',
);

const createCarSpecificationUseCaseMock =
  CreateCarSpecificationUseCase as jest.MockedClass<
    typeof CreateCarSpecificationUseCase
  >;

describe('Create CarSpecification Controller', () => {
  beforeEach(() => {
    createCarSpecificationUseCaseMock.prototype.execute.mockRestore();
  });

  it('should response statusCode 201 when call createCarSpecification', async () => {
    const mockRequest = getMockReq({
      body: {
        speficicationsId: [faker.datatype.uuid(), faker.datatype.uuid()],
      },
      params: {
        id: faker.datatype.uuid(),
      },
    });

    const { res, next } = getMockRes();

    const carMock = {
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
      specifications: [
        {
          id: faker.datatype.uuid(),
          name: faker.datatype.string(64),
          description: faker.datatype.string(64),
          cars: [],
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        },
        {
          id: faker.datatype.uuid(),
          name: faker.datatype.string(64),
          description: faker.datatype.string(64),
          cars: [],
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        },
      ],
      images: [],
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const response = createUseCaseSuccess<Car>(carMock);

    createCarSpecificationUseCaseMock.prototype.execute.mockResolvedValue(
      response,
    );

    await CreateCarSpecificationController(mockRequest, res, next);

    expect(createCarSpecificationUseCaseMock.prototype.execute).toBeCalledTimes(
      1,
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(carMock);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call createCarSpecification', async () => {
    const mockRequest = getMockReq({
      body: {
        speficicationsId: [faker.datatype.uuid(), faker.datatype.uuid()],
      },
      params: {
        id: faker.datatype.uuid(),
      },
    });

    const { res, next } = getMockRes();

    const createCategoryError: IUseCaseError = {
      message: 'car does not exists',
      statusCode: 400,
    };

    const response = createUseCaseError(createCategoryError);

    createCarSpecificationUseCaseMock.prototype.execute.mockResolvedValue(
      response,
    );

    await CreateCarSpecificationController(mockRequest, res, next);

    expect(createCarSpecificationUseCaseMock.prototype.execute).toBeCalledTimes(
      1,
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: createCategoryError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const mockRequest = getMockReq({
      body: {
        specificationsId: [faker.datatype.uuid(), faker.datatype.uuid()],
      },
      params: {
        id: faker.datatype.uuid(),
      },
    });

    const { res, next } = getMockRes();

    createCarSpecificationUseCaseMock.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await CreateCarSpecificationController(mockRequest, res, next);

    expect(createCarSpecificationUseCaseMock.prototype.execute).toBeCalledTimes(
      1,
    );
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});

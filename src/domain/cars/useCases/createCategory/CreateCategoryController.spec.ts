import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import { IServiceError } from '../../../../commonMethods/domainResults/interfaces';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';
import { createCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

jest.mock('./CreateCategoryUseCase');

const createCategoryMock = CreateCategoryUseCase as jest.MockedClass<
  typeof CreateCategoryUseCase
>;

describe('Create Category Controller', () => {
  beforeEach(() => {
    createCategoryMock.prototype.execute.mockRestore();
  });

  it('should response statusCode 201 when call createCategory', async () => {
    const createCategory: ICreateCategoryDTO = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: createCategory,
    });

    const { res, next } = getMockRes();

    const createCategorySuccess: Category = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const serviceSucess = createServiceSuccess<Category>(createCategorySuccess);

    createCategoryMock.prototype.execute.mockResolvedValue(serviceSucess);

    await createCategoryController(mockRequest, res, next);

    expect(createCategoryMock.prototype.execute).toBeCalledTimes(1);
    expect(createCategoryMock.prototype.execute).toBeCalledWith(createCategory);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(createCategorySuccess);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call createCategory', async () => {
    const createCategory: ICreateCategoryDTO = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: createCategory,
    });

    const { res, next } = getMockRes();

    const createCategoryError: IServiceError = {
      message: 'Error inserting category in database',
      statusCode: 400,
    };

    const serviceError = createServiceError(createCategoryError);

    createCategoryMock.prototype.execute.mockResolvedValue(serviceError);

    await createCategoryController(mockRequest, res, next);

    expect(createCategoryMock.prototype.execute).toBeCalledTimes(1);
    expect(createCategoryMock.prototype.execute).toBeCalledWith(createCategory);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: createCategoryError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const createCategory: ICreateCategoryDTO = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: createCategory,
    });

    const { res, next } = getMockRes();

    createCategoryMock.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await createCategoryController(mockRequest, res, next);

    expect(createCategoryMock.prototype.execute).toBeCalledTimes(1);
    expect(createCategoryMock.prototype.execute).toBeCalledWith(createCategory);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});

import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import { IServiceError } from '../../../../commonMethods/domainResults/interfaces';
import { Category } from '../../infra/typeorm/entities/Category';
import { IListCategoriesData } from '../../interfaces/categories/IListCategoriesData';
import { listCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const generateListCategories = (): Category[] => {
  const auxArray = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const newCategory: Category = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    auxArray.push(newCategory);
  }

  return auxArray;
};

jest.mock('./ListCategoriesUseCase');

const listCategoriesMock = ListCategoriesUseCase as jest.MockedClass<
  typeof ListCategoriesUseCase
>;

const queryParams = {
  name: faker.datatype.string(12),
  description: faker.datatype.string(12),
  order: 'ASC',
  totalItemsPerPage: faker.datatype.number(),
  page: faker.datatype.number(),
};

describe('List Categories Controller', () => {
  beforeEach(() => {
    listCategoriesMock.prototype.execute.mockRestore();
  });

  it('should response statusCode 200 when call listCategories', async () => {
    const listData = generateListCategories();

    const responseService: IListCategoriesData = {
      categories: listData,
      totalItems: faker.datatype.number(),
      page: faker.datatype.number(),
      totalItemsPerPage: faker.datatype.number(),
      totalPages: faker.datatype.number(),
    };

    const mockRequest = getMockReq({
      query: queryParams,
    });

    const { res, next } = getMockRes();

    const serviceSucess =
      createServiceSuccess<IListCategoriesData>(responseService);

    listCategoriesMock.prototype.execute.mockResolvedValue(serviceSucess);

    await listCategoriesController(mockRequest, res, next);

    expect(listCategoriesMock.prototype.execute).toBeCalledTimes(1);
    expect(listCategoriesMock.prototype.execute).toBeCalledWith(queryParams);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call listCategories', async () => {
    const mockRequest = getMockReq({
      query: queryParams,
    });

    const { res, next } = getMockRes();

    const createCategoryError: IServiceError = {
      message: 'Error list category in database',
      statusCode: 400,
    };

    const serviceError = createServiceError(createCategoryError);

    listCategoriesMock.prototype.execute.mockResolvedValue(serviceError);

    await listCategoriesController(mockRequest, res, next);

    expect(listCategoriesMock.prototype.execute).toBeCalledTimes(1);
    expect(listCategoriesMock.prototype.execute).toBeCalledWith(queryParams);
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

    listCategoriesMock.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await listCategoriesController(mockRequest, res, next);

    expect(listCategoriesMock.prototype.execute).toBeCalledTimes(1);
    expect(listCategoriesMock.prototype.execute).toBeCalledWith(queryParams);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});

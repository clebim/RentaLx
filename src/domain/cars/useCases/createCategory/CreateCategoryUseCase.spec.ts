import faker from 'faker';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../helpers/domainResults/CreateRepositoryResults';
import { IRepositoryError } from '../../../../helpers/domainResults/interfaces';
import { Category } from '../../infra/typeorm/entities/Category';
import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const repository = new CategoriesRepository();

let createCategory: CreateCategoryUseCase;

jest.mock('../../infra/typeorm/repositories/CategoriesRepository');
const repositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;

describe('Create Category', () => {
  beforeEach(() => {
    createCategory = new CreateCategoryUseCase(repository);
    repositoryMock.prototype.create.mockRestore();
    repositoryMock.prototype.findByName.mockRestore();
  });

  it('should able to create a new category', async () => {
    const createCategoryData: ICreateCategoryDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    const repositoryData = {
      id: faker.datatype.uuid(),
      name: createCategoryData.name,
      description: createCategoryData.description,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const findError = createRepositorySuccess<Category>(undefined);
    const createSuccess = createRepositorySuccess<Category>(repositoryData);

    repositoryMock.prototype.findByName.mockResolvedValue(findError);
    repositoryMock.prototype.create.mockResolvedValue(createSuccess);

    const response = await createCategory.execute(createCategoryData);

    expect(response.data).toEqual(repositoryData);
    expect(response.isSuccess).toBe(true);
  });

  it('should not able to create a new category with name exists', async () => {
    const createCategoryData: ICreateCategoryDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    const findData = {
      id: faker.datatype.uuid(),
      name: createCategoryData.name,
      description: createCategoryData.description,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const repositorySuccess = createRepositorySuccess<Category>(findData);

    repositoryMock.prototype.findByName.mockResolvedValue(repositorySuccess);

    const response = await createCategory.execute(createCategoryData);

    expect(response.data).toBe(null);
    expect(response.isFailure).toBe(true);
    expect(response.error.message).toEqual(
      'Category already registered on the platform',
    );
    expect(response.error.statusCode).toEqual(400);
  });

  it('should not able to create a new category because unknown error', async () => {
    const createCategoryData: ICreateCategoryDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    const repositoryDataError: IRepositoryError = {
      message: 'Error inserting category in database',
      repository: 'CategoriesRepository',
    };

    const findError = createRepositorySuccess<Category>(undefined);
    const repositoryError = createRepositoryError(repositoryDataError);

    repositoryMock.prototype.findByName.mockResolvedValue(findError);
    repositoryMock.prototype.create.mockResolvedValue(repositoryError);

    const response = await createCategory.execute(createCategoryData);

    expect(response.data).toBe(null);
    expect(response.isFailure).toBe(true);
    expect(response.error.message).toEqual(repositoryDataError.message);
    expect(response.error.statusCode).toEqual(400);
  });

  it('should not able to create a new category because repository fatal error', async () => {
    const createCategoryData: ICreateCategoryDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    repositoryMock.prototype.create.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await createCategory.execute(createCategoryData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });
});

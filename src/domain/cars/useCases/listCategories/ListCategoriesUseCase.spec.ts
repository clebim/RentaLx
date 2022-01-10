import faker from 'faker';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../commonMethods/domainResults/CreateRepositoryError';
import { IRepositoryError } from '../../../../commonMethods/domainResults/interfaces';
import { Category } from '../../infra/entities/Category';
import { CategoriesRepository } from '../../infra/repositories/CategoriesRepository';
import { IListCategoriesProps } from '../../interfaces/categories/IListCategoriesProps';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const repository = new CategoriesRepository();
let listCategories: ListCategoriesUseCase;

jest.mock('../../infra/repositories/CategoriesRepository');
const repositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;

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

describe('List Categories', () => {
  beforeEach(() => {
    listCategories = new ListCategoriesUseCase(repository);
    repositoryMock.prototype.list.mockRestore();
  });

  it('should get a list category', async () => {
    const categoriesData = generateListCategories();

    const responseRepository: [Category[], number] = [
      categoriesData,
      faker.datatype.number(10),
    ];

    const createSuccess =
      createRepositorySuccess<[Category[], number]>(responseRepository);

    const listCategoriesProps: IListCategoriesProps = {
      order: 'ASC',
      page: faker.datatype.number(),
      totalItemsPerPage: faker.datatype.number(),
    };

    repositoryMock.prototype.list.mockResolvedValue(createSuccess);

    const response = await listCategories.execute(listCategoriesProps);

    expect(response.data.categories).toEqual(responseRepository[0]);
    expect(response.data.totalItems).toEqual(responseRepository[1]);
    expect(response.isSuccess).toBe(true);
  });

  it('should not able list category because unknown error', async () => {
    const repositoryDataError: IRepositoryError = {
      message: 'Error list categories in database',
      repository: 'CategoriesRepository',
    };

    const repositoryError = createRepositoryError(repositoryDataError);

    repositoryMock.prototype.list.mockResolvedValue(repositoryError);

    const response = await listCategories.execute({});

    expect(response.data).toBe(null);
    expect(response.isFailure).toBe(true);
    expect(response.error.message).toEqual(repositoryDataError.message);
    expect(response.error.statusCode).toEqual(400);
  });

  it('should not able to list category because repository fatal error', async () => {
    repositoryMock.prototype.create.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await listCategories.execute({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });
});

import faker from 'faker';
import { resolve } from 'path';

import { createRepositorySuccess } from '../../../../helpers/domainResults/CreateRepositoryError';
import { MockCsv } from '../../../../shared/mocks/csv.mock';
import { Category } from '../../infra/typeorm/entities/Category';
import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const path = resolve(__dirname);

const fakeString = (index: number) => `NameOrDescription${index}`;

const generateCvsData = (): string[] => {
  const auxArray = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const stringData = `${fakeString(i)},${fakeString(i)}`;

    auxArray.push(stringData);
  }

  return auxArray;
};

jest.mock('../../infra/typeorm/repositories/CategoriesRepository');
const repositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;

const repository = new CategoriesRepository();

let importCategories: ImportCategoryUseCase;

describe('Import Category', () => {
  beforeEach(() => {
    importCategories = new ImportCategoryUseCase(repository);
    repositoryMock.prototype.create.mockRestore();
    repositoryMock.prototype.findByName.mockRestore();
    repositoryMock.prototype.list.mockRestore();
  });

  it('should able import csv to craate many categories', async () => {
    const csvData = generateCvsData();

    const mockCsvClass = new MockCsv();

    const file = await mockCsvClass.mockCsv(`${path}/teste.csv`, csvData);

    csvData.forEach(line => {
      const [name, description] = line.split(',');

      const repositoryData = {
        id: faker.datatype.uuid(),
        name,
        description,
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
      };

      const findError = createRepositorySuccess<Category>(undefined);
      const createSuccess = createRepositorySuccess<Category>(repositoryData);

      repositoryMock.prototype.findByName.mockResolvedValueOnce(findError);
      repositoryMock.prototype.create.mockResolvedValueOnce(createSuccess);
    });

    const arraySize = csvData.length;

    await importCategories.execute(file as Express.Multer.File);

    expect(repositoryMock.prototype.create).toBeCalledTimes(arraySize);
  });

  it('should get a error because there is no file', async () => {
    const { error, isFailure } = await importCategories.execute(undefined);

    expect(isFailure).toBeTruthy();
    expect(error.statusCode).toEqual(400);
    expect(error.message).toEqual('does not contain file');
  });
});
